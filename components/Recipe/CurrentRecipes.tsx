'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getLocalStorageItem } from 'services/dates'
import { FullRecipe } from 'types/Recipe'
import Recipe from '.'
import buttonStyles from '../Button/button.module.css'
import WeekNavigator from '../Header/WeekNavigator'
import styles from './recipes.module.css'

const CurrentRecipes = ({
  recipes,
  startDate,
}: {
  recipes: FullRecipe[]
  startDate: string
}) => {
  const [selectedRecipes, setSelectedRecipes] = useState<FullRecipe[]>()

  useEffect(() => {
    const weekRecipes = localStorage.getItem(
      getLocalStorageItem(new Date(startDate)),
    )
    if (weekRecipes) {
      const chosenRecipes = weekRecipes.split(',')
      setSelectedRecipes(
        recipes.filter((recipe) => chosenRecipes.includes(recipe.id)),
      )
    } else {
      setSelectedRecipes([])
    }
  }, [startDate, recipes])

  return (
    <div className={styles.container}>
      <WeekNavigator startDate={startDate} />
      {selectedRecipes && (
        <div
          className={
            selectedRecipes.length > 0 ? styles.allRecipes : styles.empty
          }
        >
          {selectedRecipes.length > 0 ? (
            selectedRecipes.map((recipe) => (
              <Recipe key={recipe.slug} recipe={recipe} />
            ))
          ) : (
            <>
              Vous n&lsquo;avez pas encore choisi de recette pour cette semaine
              <Link className={buttonStyles.button} href="/">
                En choisir
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CurrentRecipes
