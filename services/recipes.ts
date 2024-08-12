import axios from 'axios'
import { load } from 'cheerio'
import { Product } from 'types/Product'

const recipes: Record<string, Product> = {}

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

export const getRecipe = async (url: string) => {
  const cached = recipes[url]
  if (cached) {
    return cached
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

    const recipe = {
      id: `${data.slug}-${data.id}`,
      nbPerson: 2,
      images: [image.attr('src') as string],
      name: data.name,
      nutriscore: 'A',
      cookingTime: prepTime,
      waitingTime: totalTime,
      nutritionalInformation: {
        kiloCalorie: data.nutrition.find((x) => x.unit === 'kcal').amount,
      },
      subProducts: data.ingredients.map((ingredient) => {
        const quantity = yields.find((x) => x.id === ingredient.id)
        return {
          literalQuantity:
            (quantity.amount ? `${quantity.amount * 2} ` : '') + quantity.unit,
          quantity: quantity.amount ? quantity.amount * 2 : 1,
          product: {
            name: ingredient.name,
          },
        }
      }),
      facets: [{ name: 'Viande' }],
      steps: data.steps.map((step) => ({
        position: step.index,
        title: '',
        description: step.instructionsHTML,
      })),
    }

    recipes[url] = recipe
    return recipe
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getRecipes = async (startDate: Date) => {
  try {
    var onejan = new Date(startDate.getFullYear(), 0, 1)
    var today = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    )

    //@ts-expect-error: Expect number
    var dayOfYear = (today - onejan + 86400000) / 86400000
    const week = Math.ceil(dayOfYear / 7)

    const page = await axios.get(
      `https://www.hellofresh.fr/menus/${startDate.getFullYear()}-W${week}`,
    )
    const cheerio = load(page.data)
    const data = JSON.parse(cheerio('#__NEXT_DATA__').text())
    const urls = data.props.pageProps.ssrPayload.courses.map(
      (course) => course.recipe.websiteUrl,
    )
    const recipes = await Promise.all(urls.map(getRecipe))
    return recipes.filter((x) => x)
  } catch (err) {
    console.error('API has returned error', err)
    return null
  }
}

export const getAllRecipes = async () => {
  const now = new Date()
  const initialRecipes = await getRecipes(now)
  if (initialRecipes) {
    const allRecipes = [initialRecipes]
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
        allRecipes.push(result)
      }
    }

    return allRecipes.filter((x) => x)
  }
  return []
}
