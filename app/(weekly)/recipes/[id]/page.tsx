import React from 'react'
import { getRecipes } from 'services/recipes'
import CurrentRecipes from 'components/Recipe/CurrentRecipes'

export const revalidate = 3600 * 24
export const maxDuration = 60

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

  return (
    <CurrentRecipes startDate={result.startDate} recipes={result.recipes} />
  )
}

export default WeeklyRecipes
