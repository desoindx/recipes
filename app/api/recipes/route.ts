import { Recipe } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import prisma from 'prisma/client'
import { getRecipeInDB } from 'services/recipes'

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
    const recipe = await getRecipeInDB(
      `https://www.hellofresh.fr/recipes/${id as string}`,
    )
    if (recipe) {
      recipes.push(recipe)
    }
  }

  return NextResponse.json(recipes)
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (body.token !== process.env.SECRET) {
    return NextResponse.json('KO', { status: 401 })
  }
  await Promise.all(
    body.recipes.map((recipe) =>
      prisma.recipe.upsert({
        where: {
          id: recipe.id,
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
      }),
    ),
  )

  return NextResponse.json('OK')
}
