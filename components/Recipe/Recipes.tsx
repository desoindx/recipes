'use client'

import { useEffect, useState } from 'react'
import { Product } from 'types/Product'
import { facets } from 'components/Filter/facets'
import RecipesHeader from './RecipesHeader'
import Recipe from './index'
import styles from './recipes.module.css'

const Recipes = ({
  startDate,
  recipes,
  selectRecipe,
}: {
  startDate: string
  recipes: Product[]
  selectRecipe?: (id: string) => void
}) => {
  const [filter, setFilter] = useState<string[]>(facets)

  useEffect(() => {
    if (filter) {
      localStorage.setItem('filter', filter.join(','))
    }
  }, [filter])

  useEffect(() => {
    const storedFilter = localStorage.getItem('filter')?.split(',')
    if (storedFilter) {
      setFilter(storedFilter)
    }
  }, [])

  return (
    <div className={styles.container}>
      <RecipesHeader
        startDate={startDate}
        withFilter
        filter={filter}
        setFilter={setFilter}
      />
      <div className={styles.allRecipes}>
        {recipes
          .filter((product) =>
            product.facets.some(
              (facet) => filter && filter.includes(facet.name),
            ),
          )
          .map((recipe) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              onClick={selectRecipe}
              withProducts
            />
          ))}
      </div>
    </div>
  )
}

export default Recipes
