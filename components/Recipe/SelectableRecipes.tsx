'use client'

import React, { useEffect, useState } from 'react'
import { getLocalStorageItem } from 'services/dates'
import { Product } from 'types/Product'
import Recipes from './Recipes'
import SelectedRecipes from './SelectedRecipes'

const SelectableRecipes = ({
  recipes,
  startDate,
}: {
  recipes: Product[]
  startDate: string
}) => {
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([])

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
    <>
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
        withHeader
        recipes={recipes.filter(
          (recipe) => !selectedRecipes.includes(recipe.id),
        )}
        selectRecipe={(recipe) => {
          setSelectedRecipes([...selectedRecipes, recipe])
        }}
      />
    </>
  )
}

export default SelectableRecipes
