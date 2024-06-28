import { NextRequest, NextResponse } from 'next/server'
import { getRecipe } from 'services/recipes'
import { Product } from 'types/Product'
import { Cooking, Pool } from 'types/Recipe'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ids = searchParams.get('ids')

  if (!ids) {
    return NextResponse.json([])
  }

  const recipes: Product[] = []
  const allIds = ids.split(',')
  for (let i = 0; i < allIds.length; i++) {
    const id = allIds[i]
    const recipe = await getRecipe(`recipe-${id}-2`)
    if (recipe) {
      const pool = recipe.pools.find((pool) => pool.nbPerson === 2) as Pool
      const cooking = pool.cookingModes.find(
        (cooking) => cooking.name === 'Aucun',
      ) as Cooking
      const nutrition = recipe.nutritionalInformations.find(
        (nutrition) => nutrition.nbPerson === 2,
      ) as { kiloCalorie: number }
      recipes.push({
        id: `recette-${recipe.id}-2`,
        nbPerson: 2,
        name: recipe.name,
        images: [recipe.image],
        cookingTime: cooking.cookingTime,
        waitingTime: cooking.waitingTime,
        subProducts: cooking.stacks.ingredients,
        nutriscore: recipe.nutriscore,
        facets: recipe.facets,
        nutritionalInformation: {
          kiloCalorie: nutrition.kiloCalorie,
        },
      })
    }
  }

  return NextResponse.json(recipes)
}
