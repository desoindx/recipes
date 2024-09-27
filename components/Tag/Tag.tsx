import React, { ReactNode } from 'react'
import { FullRecipe } from 'types/Recipe'
import styles from './Tag.module.css'

const Tag = ({ color, children }: { color: string; children: ReactNode }) => (
  <div className={styles[color]}>{children}</div>
)

export const PreparationTag = ({
  recipe,
}: {
  recipe: Pick<FullRecipe, 'waitingTime' | 'cookingTime'>
}) => {
  let color = 'grey'
  if (recipe.waitingTime < 30) {
    color = 'green'
  } else if (recipe.waitingTime > 49) {
    color = 'red'
  } else if (recipe.waitingTime > 39) {
    color = 'yellow'
  }

  return (
    <Tag color={color}>
      {recipe.waitingTime}min ({recipe.cookingTime} de prépa)
    </Tag>
  )
}

export const KCalTag = ({
  recipe,
}: {
  recipe: Pick<FullRecipe, 'kiloCalorie'>
}) => {
  let color = 'grey'
  if (recipe.kiloCalorie) {
    if (recipe.kiloCalorie < 625) {
      color = 'green'
    } else if (recipe.kiloCalorie > 900) {
      color = 'red'
    } else if (recipe.kiloCalorie > 750) {
      color = 'yellow'
    }
  }

  return <Tag color={color}>{recipe.kiloCalorie || '???'} kcal</Tag>
}
