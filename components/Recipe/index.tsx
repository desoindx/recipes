import React from 'react'
import { Product } from 'types/Product'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './recipe.module.css'

const Recipe = ({
  recipe,
  onClick,
  withProducts,
  detailOnHover,
}: {
  recipe: Product
  onClick?: (id: string) => void
  withProducts?: boolean
  detailOnHover?: boolean
}) => {
  const content = (
    <div className={classNames(styles.box, styles.nonEmptyBox, { [styles.detailedBox]: detailOnHover})}
      key={recipe.name}
      onClick={() => onClick && onClick(recipe.id)}
    >
      <img src={recipe.images[0]} alt={recipe.name} />
      {recipe.nutriscore && (
        <img className={styles.nutriscore}
          src={`https://www.quitoque.fr/static/images/picto/nutri-score-${recipe.nutriscore.toLowerCase()}.svg`}
          alt={`Nutriscore: ${recipe.nutriscore}`}
        />
      )}
      <p className={styles.title}>{recipe.name}</p>
      <p className={classNames(styles.description, {none: detailOnHover})}>
        {recipe.waitingTime}min ({recipe.cookingTime} de prépa),{' '}
        {recipe.nutritionalInformation.kiloCalorie} kcal
      </p>
      <div className={classNames(styles.productsList, {none: !withProducts})}>
        {recipe.subProducts.map((product) => (
          <span className={styles.item} key={product.product.name}>
            <b>{product.product.name}</b> : {product.literalQuantity}
          </span>
        ))}
      </div>
    </div>
  )

  return onClick ? (
    content
  ) : (
    <Link className={styles.boxLink} href={`/recipe/${recipe.id}`}>{content}</Link>
  )
}

export default Recipe
