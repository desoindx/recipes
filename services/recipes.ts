import axios from 'axios'
import { load } from 'cheerio'
import { prismaClient } from '../prisma/client'
import { FullRecipe } from '../types/Recipe'

const usefullFacets = ['Végétarien', 'Crustacés', 'Poisson']

export const urlRegex = /https:\/\/www.hellofresh.fr\/recipes\/(.*)-[a-z|0-9]*$/
const timeRegex = /PT((\d*)H)?((\d*)M)?/
const getTime = (value: string) => {
  const totalTime = value.match(timeRegex)
  if (!totalTime) {
    return 0
  }
  return (
    (totalTime[2] ? Number(totalTime[2]) : 0) * 60 +
    (totalTime[4] ? Number(totalTime[4]) : 0)
  )
}

const getRecipeInDB = async (url: string) => {
  'use cache'

  const data = urlRegex.exec(url)
  const id = data ? data[1] : ''

  return prismaClient.recipe.findFirst({
    include: { ingredients: true, steps: true },
    where: { id },
  })
}

export const getRecipesInDB = async (urls: string[]) => {
  const ids = urls.map((url) => {
    const data = urlRegex.exec(url)
    return data ? data[1] : ''
  })

  return prismaClient.recipe.findMany({
    include: { ingredients: true, steps: true },
    where: { id: { in: ids } },
  })
}

export const getRecipe = async (
  url: string,
  checkDB: boolean,
  save: boolean,
) => {
  const urlData = urlRegex.exec(url)
  const id = urlData ? urlData[1] : ''

  if (checkDB) {
    const existingRecipe = await getRecipeInDB(url)
    if (existingRecipe) {
      return existingRecipe
    }
  }

  try {
    const page = await axios.get(url)
    const cheerio = load(page.data)
    const data = JSON.parse(cheerio('#__NEXT_DATA__').text()).props.pageProps
      .ssrPayload.recipe
    const totalTime = getTime(data.totalTime)
    const prepTime = getTime(data.prepTime)

    const yields = data.yields.flatMap((x) => x.ingredients)

    const image = cheerio('[data-test-id=recipe-hero-image] img')

    const tags = data.tags.concat(data.allergens).map((tag) => tag.name)
    const facets = usefullFacets.filter((facet) => tags.includes(facet))

    const recipe = {
      id,
      slug: `${data.slug}-${data.id}`,
      image: (image.attr('src') || '') as string,
      name: data.name,
      cookingTime: totalTime,
      waitingTime: prepTime,
      kiloCalorie: data.nutrition.find((x) => x.unit === 'kcal').amount,
      ingredients: data.ingredients.map((ingredient) => {
        const quantity = yields.find((x) => x.id === ingredient.id)
        return {
          literalQuantity: quantity
            ? (quantity.amount ? `${quantity.amount * 2} ` : '') + quantity.unit
            : '',
          quantity: quantity ? (quantity.amount ? quantity.amount * 2 : 1) : 0,
          name: ingredient.name,
        }
      }),
      facets: facets.length === 0 ? ['Viande'] : facets,
      steps: data.steps.map((step) => ({
        position: step.index,
        description: step.instructionsHTML,
        image:
          step.images && step.images.length > 0
            ? `https://img.hellofresh.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3${step.images[0].path}`
            : '',
      })),
    }
    if (save) {
      try {
        await prismaClient.recipe.upsert({
          where: {
            id,
          },
          update: {},
          create: {
            ...recipe,
            ingredients: {
              create: recipe.ingredients,
            },
            steps: {
              create: recipe.steps,
            },
          },
        })
      } catch (e) {
        console.log(e)
        return recipe
      }
    }

    return recipe
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getUrls = async (startDate: Date) => {
  const onejan = new Date(startDate.getFullYear(), 0, 1)
  startDate.setDate(startDate.getDate() + 1)
  // @ts-expect-error: Expect number
  const dayOfYear = (startDate - onejan + 86400000) / 86400000
  const week = Math.ceil(dayOfYear / 7) + 1
  const page = await axios.get(
    `https://www.hellofresh.fr/menus/${startDate.getFullYear()}-W${week < 10 ? `0${week}` : week}`,
  )
  const cheerio = load(page.data)
  const data = JSON.parse(cheerio('#__NEXT_DATA__').text())
  return data.props.pageProps.ssrPayload.courses.map(
    (course) => course.recipe.websiteUrl,
  ) as string[]
}

export const getRecipes = async (startDate?: string) => {
  'use cache'

  try {
    const date = startDate ? new Date(startDate) : new Date()
    const urls = await getUrls(date)
    const ids = urls.map((url) => {
      const data = urlRegex.exec(url)
      return { id: data ? data[1] : '', url }
    })
    const existingRecipes = await prismaClient.recipe.findMany({
      include: { ingredients: true, steps: true },
      where: {
        id: {
          in: ids.map(({ id }) => id),
        },
      },
    })

    const recipes = await Promise.all(
      ids.map(({ id, url }) => {
        const existingRecipe = existingRecipes.find(
          (recipe) => recipe.id === id,
        )
        return existingRecipe || getRecipe(url, false, true)
      }),
    )

    return {
      recipes: recipes.filter((x) => x) as FullRecipe[],
      startDate: new Date(
        date.setDate(date.getDate() - date.getDay()),
      ).toISOString(),
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getAllRecipes = async (): Promise<FullRecipe[][]> => {
  const now = new Date()
  const initialRecipes = await getRecipes()
  if (initialRecipes) {
    const allRecipes = [initialRecipes.recipes as FullRecipe[]]
    now.setDate(now.getDate() - 14)
    for (let i = 0; i < 6; i++) {
      now.setDate(now.getDate() + 7)
      if (i === 4) {
        // eslint-disable-next-line no-continue
        continue
      }

      // eslint-disable-next-line no-await-in-loop
      const result = await getRecipes(now.toDateString())
      if (result) {
        allRecipes.push(result.recipes as FullRecipe[])
      }
    }

    return allRecipes.filter((x) => x)
  }
  return []
}
