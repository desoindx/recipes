import React from 'react'
import { getRecipes } from 'services/recipes'
import CurrentRecipes from 'components/Recipe/CurrentRecipes'

const WeeklyRecipes = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const date = id ? new Date(decodeURIComponent(id)) : new Date()
  const result = await getRecipes(date)
  if (!result) {
    return null
  }

  return <CurrentRecipes startDate={date.toISOString()} recipes={result} />
}

export default WeeklyRecipes
