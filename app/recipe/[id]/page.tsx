import { Metadata } from 'next'
import React from 'react'
import { getRecipe } from 'services/recipes'
import FullRecipe from 'components/Recipe/FullRecipe'

export const maxDuration = 60
export const dynamic = 'force-static'
export async function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const recipe = await getRecipe(
    `https://www.hellofresh.fr/recipes/${id as string}`,
    true,
    true,
  )

  return recipe
    ? {
        title: recipe.name,
        description: 'Votre recette du jour !',
        openGraph: {
          images: recipe.image,
        },
      }
    : {}
}

const Recipe = async ({ params: { id } }: { params: { id: string } }) => {
  const recipe = await getRecipe(
    `https://www.hellofresh.fr/recipes/${id as string}`,
    true,
    true,
  )

  return recipe ? <FullRecipe recipe={recipe} /> : null
}

export default Recipe
