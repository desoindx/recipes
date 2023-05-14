import { useEffect, useState } from 'react'
import { getFrontDate } from 'services/dates'
import { Product } from 'types/Product'
import Filter from 'components/Filter/Filter'
import { facetOptions, facets } from 'components/Filter/facets'
import Recipe from '.'
import EmptyRecipe from './EmptyRecipe'
import { AllRecipes, Container, Header } from './recipes.styles'

const Recipes = ({
  startDate,
  recipes,
  selectRecipe,
  showRecipe,
  withFilter,
}: {
  startDate: string
  recipes: Product[]
  selectRecipe: (id: string) => void
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
    <Container>
      <Header>
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
      </Header>
      <AllRecipes>
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
      </AllRecipes>
    </Container>
  )
}

export default Recipes
