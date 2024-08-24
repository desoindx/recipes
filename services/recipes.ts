import axios from 'axios'
import { load } from 'cheerio'
import { Product } from 'types/Product'

const recipes: Record<string, Product> = {}

const usefullFacets = ['Végétarien', 'Crustacés', 'Poisson']

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

    const tags = data.tags.concat(data.allergens).map((tag) => tag.name)
    const facets = usefullFacets.filter((facet) => tags.includes(facet))

    const recipe = {
      id: `${data.slug}-${data.id}`,
      nbPerson: 2,
      images: [image.attr('src') as string],
      name: data.name,
      cookingTime: totalTime,
      waitingTime: prepTime,
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
      facets: (facets.length === 0 ? ['Viande'] : facets).map((facet) => ({
        name: facet,
      })),
      steps: data.steps.map((step) => ({
        position: step.index,
        title: '',
        description: step.instructionsHTML,
        image:
          step.images && step.images.length > 0
            ? `https://img.hellofresh.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3${step.images[0].path}`
            : undefined,
      })),
    }

    recipes[url] = recipe
    return recipe
  } catch (e) {
    return null
  }
}

export const getRecipes = async (startDate: Date) => {
  try {
    var onejan = new Date(startDate.getFullYear(), 0, 1)

    //@ts-expect-error: Expect number
    var dayOfYear = (startDate - onejan + 86400000) / 86400000
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
    const day = startDate.getDay()

    return {
      recipes: recipes.filter((x) => x),
      startDate: new Date(
        startDate.setDate(startDate.getDate() - day + (day == 0 ? -6 : 1)),
      ).toISOString(),
    }
  } catch (err) {
    return null
  }
}

export const getAllRecipes = async (): Promise<Product[][]> => {
  const now = new Date()
  const initialRecipes = await getRecipes(now)
  if (initialRecipes) {
    const allRecipes = [initialRecipes.recipes]
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
        allRecipes.push(result.recipes)
      }
    }

    return allRecipes.filter((x) => x)
  }
  return []
}
