import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { Product } from 'types/Product'
import { getEmoji } from 'components/Filter/facets'
import Nutriscore from 'components/Tag/Nutriscore'
import Tags from 'components/Tag/Tags'
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
    <div
      className={classNames(styles.box, styles.nonEmptyBox, {
        [styles.detailedBox]: detailOnHover,
      })}
      key={recipe.name}
      onClick={() => onClick && onClick(recipe.id)}
    >
      <img src={recipe.images[0]} alt={recipe.name} />
      {recipe.nutriscore && (
        <Nutriscore
          className={styles.nutriscore}
          nutriscore={recipe.nutriscore}
        />
      )}
      <div className={styles.recipeType}>{getEmoji(recipe.facets)}</div>
      <p className={styles.title}>{recipe.name}</p>
      <Tags recipe={recipe} />
      <div className={classNames(styles.productsList, { none: !withProducts })}>
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
    <Link className={styles.boxLink} href={`/recipe/${recipe.id}`}>
      {content}
    </Link>
  )
}

export default Recipe
