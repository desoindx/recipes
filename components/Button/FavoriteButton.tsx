'use client'

import React, { useEffect, useState } from 'react'
import { getFavorites } from 'services/favorites'
import styles from './button.module.css'

const FavoriteButton = ({ recipe }: { recipe: string }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = getFavorites()
    setIsFavorite(favorites.includes(recipe))
  }, [recipe])

  return (
    <button
      className={styles.favoriteButton}
      onClick={() => {
        const favorites = getFavorites()
        if (isFavorite) {
          localStorage.setItem(
            'favorites',
            favorites.filter((favorite) => favorite !== recipe).join(','),
          )
          setIsFavorite(false)
        } else {
          localStorage.setItem('favorites', [...favorites, recipe].join(','))
          setIsFavorite(true)
        }
      }}
    >
      {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    </button>
  )
}

export default FavoriteButton
