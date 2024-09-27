import React from 'react'
import { FullRecipe } from 'types/Recipe'
import { KCalTag, PreparationTag } from './Tag'
import styles from './Tags.module.css'

const Tags = ({
  recipe,
}: {
  recipe: Pick<FullRecipe, 'kiloCalorie' | 'cookingTime' | 'waitingTime'>
}) => (
  <div className={styles.tags}>
    <PreparationTag recipe={recipe} />
    <KCalTag recipe={recipe} />
  </div>
)

export default Tags
