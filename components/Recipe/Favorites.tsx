'use client'

import React, { useEffect, useState } from 'react'
import { getFavorites } from 'services/favorites'
import { FullRecipe } from 'types/Recipe'
import Recipe from '.'
import EmptyRecipe from './Empty/EmptyRecipe'
import styles from './recipes.module.css'

const Favorites = () => {
  const [favorites, setFavorites] = useState<FullRecipe[]>([])

  useEffect(() => {
    const ids = getFavorites()
    fetch(`/api/recipes?ids=${ids.join(',')}`).then(async (response) => {
      const recipes = await response.json()
      setFavorites(recipes)
    })
  }, [])

  return favorites.length > 0 ? (
    <>
      <h1 className={styles.title}>Vos recettes favorite</h1>
      <div className={styles.allRecipes}>
        {favorites.map((favorite) => (
          <Recipe key={favorite.id} recipe={favorite} />
        ))}
      </div>
    </>
  ) : (
    <>
      <h1 className={styles.title}>
        Chargement de vos recettes favorites en cours...
      </h1>
      <div className={styles.allRecipes}>
        <EmptyRecipe />
        <EmptyRecipe />
        <EmptyRecipe />
        <EmptyRecipe />
      </div>
    </>
  )
}

export default Favorites
