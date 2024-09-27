import axios from 'axios'
import { load } from 'cheerio'
import prisma from '../prisma/client'
import { FullRecipe } from '../types/Recipe'

const usefullFacets = ['Végétarien', 'Crustacés', 'Poisson']

const urlRegex = /https:\/\/www.hellofresh.fr\/recipes\/(.*)-[a-z|0-9]*$/
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

export const getRecipeInDB = async (url: string) => {
  const data = urlRegex.exec(url)
  const id = data ? data[1] : ''

  const existingRecipe = await prisma.recipe.findFirst({
    include: { ingredients: true, steps: true },
    where: { id },
  })
  return existingRecipe
}

export const getRecipe = async (
  url: string,
  checkDB: boolean,
  save: boolean,
) => {
  const data = urlRegex.exec(url)
  const id = data ? data[1] : ''

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
      image: image.attr('src') as string,
      name: data.name,
      cookingTime: totalTime,
      waitingTime: prepTime,
      kiloCalorie: data.nutrition.find((x) => x.unit === 'kcal').amount,
      ingredients: data.ingredients.map((ingredient) => {
        const quantity = yields.find((x) => x.id === ingredient.id)
        return {
          literalQuantity:
            (quantity.amount ? `${quantity.amount * 2} ` : '') + quantity.unit,
          quantity: quantity.amount ? quantity.amount * 2 : 1,
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
            : undefined,
      })),
    }
    if (save) {
      try {
        await prisma.recipe.upsert({
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
  var onejan = new Date(startDate.getFullYear(), 0, 1)

  //@ts-expect-error: Expect number
  var dayOfYear = (startDate - onejan + 86400000) / 86400000
  const week = Math.ceil(dayOfYear / 7)

  const page = await axios.get(
    `https://www.hellofresh.fr/menus/${startDate.getFullYear()}-W${week}`,
  )
  const cheerio = load(page.data)
  const data = JSON.parse(cheerio('#__NEXT_DATA__').text())
  return data.props.pageProps.ssrPayload.courses.map(
    (course) => course.recipe.websiteUrl,
  ) as string[]
}

export const getRecipes = async (startDate: Date) => {
  try {
    const urls = await getUrls(startDate)
    const existingRecipes = await prisma.recipe.findMany({
      include: { ingredients: true, steps: true },
      where: {
        id: {
          in: urls.map((url) => {
            const data = urlRegex.exec(url)
            return data ? data[1] : ''
          }),
        },
      },
    })

    const recipes = await Promise.all(
      urls.map((url) => {
        const existingRecipe = existingRecipes.find(
          (recipe) => recipe.id === url,
        )
        return existingRecipe || getRecipe(url, false, true)
      }),
    )

    const day = startDate.getDay()

    return {
      recipes: recipes.filter((x) => x) as FullRecipe[],
      startDate: new Date(
        startDate.setDate(startDate.getDate() - day + (day == 0 ? -6 : 1)),
      ).toISOString(),
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getAllRecipes = async (): Promise<FullRecipe[][]> => {
  const now = new Date()
  const initialRecipes = await getRecipes(now)
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
      const result = await getRecipes(now)
      if (result) {
        allRecipes.push(result.recipes as FullRecipe[])
      }
    }

    return allRecipes.filter((x) => x)
  }
  return []
}
