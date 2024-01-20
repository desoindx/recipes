import React from 'react'
import { getRecipe } from 'services/recipes'
import FullRecipe from 'components/Recipe/FullRecipe'

const Recipe = async ({ params: { id } }: { params: { id: string } }) => {
  const recipe = await getRecipe(id as string)

  return <FullRecipe recipe={recipe} />
}

export default Recipe
