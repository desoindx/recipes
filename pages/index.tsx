import Recipes from 'components/Recipe/Recipes'
import SelectedRecipes from 'components/Recipe/SelectedRecipes'
import { useEffect, useState } from 'react'
import { fetchCached } from 'services/agent'
import { getLocalStorageItem } from 'services/dates'
import { Product } from 'types/Product'

export default function Home(): JSX.Element {
  const [selectedRecipes, setSelectedRecipes] = useState([])
  const [recipes, setRecipes] = useState<Product[]>([])
  const [startDate, setStartDate] = useState('')

  useEffect(() => {
    fetchCached('/api/recipes').then((data) => {
      setRecipes(data.recipes)
      setStartDate(data.startDate)
    })
  }, [])

  useEffect(() => {
    const existingSelectedRecipes = localStorage.getItem(
      getLocalStorageItem(new Date(startDate)),
    )
    if (existingSelectedRecipes) {
      setSelectedRecipes(existingSelectedRecipes.split(','))
    }
  }, [startDate])

  useEffect(() => {
    localStorage.setItem(
      getLocalStorageItem(new Date(startDate)),
      selectedRecipes.join(','),
    )
  }, [startDate, selectedRecipes])

  return (
    <div className="main-container">
      {recipes.length > 0 && selectedRecipes.length > 0 && (
        <SelectedRecipes
          recipes={recipes.filter((recipe) =>
            selectedRecipes.includes(recipe.id),
          )}
          unselectRecipe={(recipe) =>
            setSelectedRecipes(selectedRecipes.filter((r) => r !== recipe))
          }
        />
      )}
      <Recipes
        startDate={startDate}
        recipes={recipes.filter(
          (recipe) => !selectedRecipes.includes(recipe.id),
        )}
        selectRecipe={(recipe) => {
          setSelectedRecipes([...selectedRecipes, recipe])
        }}
        withFilter
      />
    </div>
  )
}
