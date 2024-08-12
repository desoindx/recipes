import React from 'react'
import { getRecipes } from 'services/recipes'
import CurrentRecipes from 'components/Recipe/CurrentRecipes'

export const revalidate = 3600 * 24

const WeeklyRecipes = async () => {
  const result = await getRecipes(new Date())
  if (!result) {
    return null
  }

  return (
    <CurrentRecipes startDate={new Date().toISOString()} recipes={result} />
  )
}

export default WeeklyRecipes
