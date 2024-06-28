import React, { ReactNode } from 'react'
import { Product } from 'types/Product'
import styles from './Tag.module.css'

const Tag = ({ color, children }: { color: string; children: ReactNode }) => (
  <div className={styles[color]}>{children}</div>
)

export const PreparationTag = ({
  recipe,
}: {
  recipe: Pick<Product, 'waitingTime' | 'cookingTime'>
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
  recipe: Pick<Product, 'nutritionalInformation'>
}) => {
  let color = 'grey'
  if (recipe.nutritionalInformation) {
    if (recipe.nutritionalInformation.kiloCalorie < 400) {
      color = 'green'
    } else if (recipe.nutritionalInformation.kiloCalorie > 799) {
      color = 'red'
    } else if (recipe.nutritionalInformation.kiloCalorie > 599) {
      color = 'yellow'
    }
  }

  return (
    <Tag color={color}>
      {recipe.nutritionalInformation?.kiloCalorie || '???'} kcal
    </Tag>
  )
}
