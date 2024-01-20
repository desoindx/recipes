import React from 'react'
import { facets } from 'components/Filter/facets'
import RecipesHeader from '../RecipesHeader'
import styles from '../recipes.module.css'
import EmptyRecipe from './EmptyRecipe'

const EmptyRecipes = () => (
  <>
    <RecipesHeader withFilter filter={facets} />
    <div className={styles.allRecipes}>
      <EmptyRecipe />
      <EmptyRecipe />
      <EmptyRecipe />
      <EmptyRecipe />
    </div>
  </>
)

export default EmptyRecipes
