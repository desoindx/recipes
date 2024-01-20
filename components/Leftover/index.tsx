'use client'

import React, { useEffect, useState } from 'react'
import ReactSelect from 'react-select'
import { Product } from 'types/Product'
import Filter from 'components/Filter/Filter'
import { facets } from 'components/Filter/facets'
import Recipe from 'components/Recipe'
import recipesStyles from 'components/Recipe/recipes.module.css'
import selectStyles from 'components/Select/styles'
import styles from './leftover.module.css'

const Leftover = ({
  plannings,
  products,
}: {
  plannings: { recipes: Product[]; startDate: string }[]
  products: string[]
}) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const [toDisplay, setToDisplay] = useState<
    { recipe: Product; startDate: string }[]
  >([])

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

  useEffect(() => {
    setToDisplay(
      plannings
        .flatMap((planning) =>
          planning.recipes
            .filter((product) =>
              product.facets.some((facet) => filter.includes(facet.name)),
            )
            .filter((recipe) =>
              selectedProducts.every((product) =>
                recipe.subProducts.find(
                  (recipeProduct) => recipeProduct.product.name === product,
                ),
              ),
            )
            .map((recipe) => ({
              recipe,
              startDate: planning.startDate,
            })),
        )
        .filter(
          ({ recipe }, index, recipes) =>
            recipes.findIndex((r) => r.recipe.id === recipe.id) === index,
        ),
    )
  }, [plannings, filter, selectedProducts])

  return (
    <>
      <div className={styles.selects}>
        <label htmlFor="produits" className={styles.hiddenLabel}>
          Filtrer par produit
        </label>
        <ReactSelect
          inputId="produits"
          isMulti
          options={products.map((product) => ({
            label: product,
            value: product,
          }))}
          onChange={(value) =>
            setSelectedProducts(value.map((option) => option.value))
          }
          styles={selectStyles}
        />
        <Filter values={filter} setValues={setFilter} />
      </div>
      <div className={recipesStyles.allRecipes}>
        {toDisplay.map(({ recipe }) => (
          <Recipe key={recipe.id} recipe={recipe} withProducts />
        ))}
      </div>
    </>
  )
}

export default Leftover
