import React from 'react'
import { getRecipes } from 'services/recipes'
import CurrentRecipes from 'components/Recipe/CurrentRecipes'

export const maxDuration = 60
export const dynamic = 'force-static'
export async function generateStaticParams() {
  return []
}

const WeeklyRecipes = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const result = await getRecipes(decodeURIComponent(id))
  if (!result) {
    return null
  }

  return <CurrentRecipes startDate={id} recipes={result.recipes} />
}

export default WeeklyRecipes
