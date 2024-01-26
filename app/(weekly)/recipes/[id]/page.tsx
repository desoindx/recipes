import React from 'react'
import { getRecipes } from 'services/recipes'
import CurrentRecipes from 'components/Recipe/CurrentRecipes'

const WeeklyRecipes = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const result = await getRecipes(decodeURIComponent(id))
  if (!result) {
    return null
  }

  const { startDate, recipes } = result

  return <CurrentRecipes startDate={startDate} recipes={recipes} />
}

export default WeeklyRecipes
