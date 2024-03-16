import { Metadata } from 'next'
import React from 'react'
import { getRecipe } from 'services/recipes'
import FullRecipe from 'components/Recipe/FullRecipe'

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const recipe = await getRecipe(id as string)

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
  const recipe = await getRecipe(id as string)

  return recipe ? <FullRecipe recipe={recipe} /> : null
}

export default Recipe
