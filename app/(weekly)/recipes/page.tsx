import React from 'react'
import { getRecipes } from 'services/recipes'
import WeekButtons from 'components/Button/WeekButtons'
import CurrentRecipes from 'components/Recipe/CurrentRecipes'

export const revalidate = 3600 * 24

const WeeklyRecipes = async () => {
  const result = await getRecipes()
  if (!result) {
    return null
  }

  const { startDate, recipes } = result
  return (
    <>
      <CurrentRecipes startDate={startDate} recipes={recipes} />
      <WeekButtons startDate={startDate} />
    </>
  )
}

export default WeeklyRecipes
