import React from 'react'
import { Product } from 'types/Product'
import { KCalTag, PreparationTag } from './Tag'
import styles from './Tags.module.css'

const Tags = ({
  recipe,
}: {
  recipe: Pick<
    Product,
    'nutritionalInformation' | 'cookingTime' | 'waitingTime'
  >
}) => (
  <div className={styles.tags}>
    <PreparationTag recipe={recipe} />
    <KCalTag recipe={recipe} />
  </div>
)

export default Tags
