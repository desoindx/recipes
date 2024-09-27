import { Recipe } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { getRecipe } from 'services/recipes'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ids = searchParams.get('ids')

  if (!ids) {
    return NextResponse.json([])
  }

  const recipes: Recipe[] = []
  const allIds = ids.split(',')

  for (let i = 0; i < allIds.length; i++) {
    const id = allIds[i]
    const recipe = await getRecipe(
      `https://www.hellofresh.fr/recipes/${id as string}`,
      true,
    )
    if (recipe) {
      recipes.push(recipe)
    }
  }

  return NextResponse.json(recipes)
}
