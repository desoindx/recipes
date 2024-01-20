import React from 'react'
import { getAllRecipes } from 'services/recipes'
import Leftover from 'components/Leftover'

export const revalidate = 3600 * 24

const Restes = async () => {
  const plannings = await getAllRecipes()

  const planningsProduct = plannings.flatMap((planning) =>
    planning.recipes.flatMap((recipe) =>
      recipe.subProducts.map((product) => product.product.name),
    ),
  )

  return (
    <Leftover
      plannings={plannings}
      products={[...new Set(planningsProduct)].sort((a, b) =>
        a.localeCompare(b),
      )}
    />
  )
}

export default Restes
