'use client'

import React, { useEffect, useState } from 'react'
import ReactSelect from 'react-select'
import { FullRecipe } from 'types/Recipe'
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
  plannings: FullRecipe[]
  products: string[]
}) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const [toDisplay, setToDisplay] = useState<FullRecipe[]>([])

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
        .filter((product) =>
          product.facets.some((facet) => filter.includes(facet)),
        )
        .filter((recipe) =>
          selectedProducts.every((product) =>
            recipe.ingredients.find(
              (ingredient) => ingredient.name === product,
            ),
          ),
        )
        .filter(
          (recipe, index, recipes) =>
            recipes.findIndex((r) => r.id === recipe.id) === index,
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
        {toDisplay.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} withProducts />
        ))}
      </div>
    </>
  )
}

export default Leftover
