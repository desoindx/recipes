import axios from 'axios'
import { FullRecipe } from 'types/Recipe'
import { getRecipe, getUrls } from '../services/recipes'

const saveRecipes = async () => {
  const urls = await getUrls(new Date())
  const ids = urls.map((url) =>
    url.replace('https://www.hellofresh.fr/recipes/', ''),
  )

  const savedRecipes = await axios.get<FullRecipe[]>(
    `${process.env.URL || 'https://weekly-recipes.vercel.app'}/api/recipes?ids=${ids.join(',')}`,
  )

  const newRecipes = await Promise.all(
    urls
      .filter(
        (url) =>
          !savedRecipes.data.find(
            (savedRecipe) =>
              savedRecipe.slug ===
              url.replace('https://www.hellofresh.fr/recipes/', ''),
          ),
      )
      .map((url) => getRecipe(url, false, false))
      .filter((x) => x),
  )

  if (newRecipes.length > 0) {
    await axios.post(
      `${process.env.URL || 'https://weekly-recipes.vercel.app'}/api/recipes`,
      {
        token: process.env.SECRET,
        recipes: newRecipes,
      },
    )
    console.log(`Saved ${newRecipes.length} new recipes.`)
  } else {
    console.log('Nothing to do')
  }
}

saveRecipes()
