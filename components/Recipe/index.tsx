import classNames from 'classnames'
import Link from 'next/link'
import { FullRecipe } from 'types/Recipe'
import { getEmoji } from 'components/Filter/facets'
import Tags from 'components/Tag/Tags'
import styles from './recipe.module.css'

const Recipe = ({
  recipe,
  onClick,
  withProducts,
  detailOnHover,
}: {
  recipe: FullRecipe
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
      {recipe.image && <img src={recipe.image} alt={recipe.name} />}
      <div className={styles.recipeType}>{getEmoji(recipe.facets)}</div>
      <p className={styles.title}>{recipe.name}</p>
      <Tags recipe={recipe} />
      <div className={classNames(styles.productsList, { none: !withProducts })}>
        {recipe.ingredients.map((ingredient) => (
          <span className={styles.item} key={ingredient.name}>
            {ingredient.name} :{' '}
            <span className={styles.quantity}>
              {ingredient.literalQuantity}
            </span>
          </span>
        ))}
      </div>
    </div>
  )

  return onClick ? (
    content
  ) : (
    <Link className={styles.boxLink} href={`/recipe/${recipe.slug}`}>
      {content}
    </Link>
  )
}

export default Recipe
