import { useEffect, useState } from 'react'
import { getFrontDate } from 'services/dates'
import { Product } from 'types/Product'
import Filter from 'components/Filter/Filter'
import { facetOptions, facets } from 'components/Filter/facets'
import EmptyRecipe from './EmptyRecipe'
import Recipe from './index'
import styles from './recipes.module.css'

const Recipes = ({
  startDate,
  recipes,
  selectRecipe,
  showRecipe,
  withFilter,
}: {
  startDate: string
  recipes: Product[]
  selectRecipe?: (id: string) => void
  showRecipe?: boolean
  withFilter?: boolean
}) => {
  const [filter, setFilter] = useState<string[]>()

  useEffect(() => {
    setFilter(localStorage.getItem('filter')?.split(',') || facets)
  }, [])

  useEffect(() => {
    if (filter) {
      localStorage.setItem('filter', filter.join(','))
    }
  }, [filter])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Recettes de la semaine du {getFrontDate(startDate)}</span>
        {withFilter && filter && (
          <Filter
            values={filter}
            setValues={(e) => {
              if (e.target.checked) {
                setFilter([...filter, e.target.name])
              } else {
                const newFilter = filter.filter(
                  (value) => value !== e.target.name,
                )
                setFilter(
                  newFilter.length > 0
                    ? newFilter
                    : facetOptions.map((option) => option.value),
                )
              }
            }}
          />
        )}
      </div>
      <div className={styles.allRecipes}>
        {startDate ? (
          (withFilter
            ? recipes.filter((product) =>
                product.facets.some(
                  (facet) => filter && filter.includes(facet.name),
                ),
              )
            : recipes
          ).map((recipe) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              onClick={selectRecipe}
              withProducts={!showRecipe}
            />
          ))
        ) : (
          <>
            <EmptyRecipe />
            <EmptyRecipe />
            <EmptyRecipe />
            <EmptyRecipe />
          </>
        )}
      </div>
    </div>
  )
}

export default Recipes
