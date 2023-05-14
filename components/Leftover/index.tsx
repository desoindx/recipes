import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Product } from 'types/Product'
import Filter from 'components/Filter/Filter'
import { facetOptions, facets } from 'components/Filter/facets'
import Recipe from 'components/Recipe'
import { AllRecipes } from 'components/Recipe/recipes.styles'
import selectStyles from 'components/Select/styles'
import { Selects } from './leftover.styles'

const Leftover = ({
  plannings,
}: {
  plannings: {
    recipes: Product[]
    startDate: string
  }[]
}) => {
  const router = useRouter()
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState<string[]>()
  const [toDisplay, setToDisplay] = useState([])

  useEffect(() => {
    setFilter(localStorage.getItem('filter')?.split(',') || facets)
  }, [])

  useEffect(() => {
    if (filter) {
      localStorage.setItem('filter', filter.join(','))
    }
  }, [filter])

  useEffect(() => {
    const planningsProduct = plannings.flatMap((planning) =>
      planning.recipes.flatMap((recipe) =>
        recipe.subProducts.map((product) => product.product.name),
      ),
    )

    setAllProducts(
      [...new Set(planningsProduct)].sort((a, b) => a.localeCompare(b)),
    )
  }, [plannings])

  useEffect(() => {
    setToDisplay(
      plannings
        .flatMap((planning) =>
          planning.recipes
            .filter((product) =>
              product.facets.some(
                (facet) => filter && filter.includes(facet.name),
              ),
            )
            .filter((recipe) =>
              products.every((product) =>
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
  }, [plannings, filter, products])

  return (
    <>
      {allProducts.length > 0 ? (
        <>
          <Selects>
            <Select
              isMulti
              options={allProducts.map((product) => ({
                label: product,
                value: product,
              }))}
              onChange={(value) =>
                setProducts(value.map((option) => option.value))
              }
              styles={selectStyles}
            />
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
          </Selects>
          <AllRecipes>
            {toDisplay.map(({ recipe }) => (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                onClick={() => router.push(`/recipe/${recipe.id}`)}
                withProducts
              />
            ))}
          </AllRecipes>
        </>
      ) : (
        <h1>Chargement de votre placard en cours...</h1>
      )}
    </>
  )
}

export default Leftover
