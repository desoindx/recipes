import classNames from 'classnames'
import React, { useMemo } from 'react'
import { Recipe } from 'types/Recipe'
import BackButton from 'components/Button/BackButton'
import FavoriteButton from 'components/Button/FavoriteButton'
import Tags from 'components/Tag/Tags'
import styles from './fullRecipe.module.css'

const FullRecipe = ({
  recipe,
  blurred,
}: {
  recipe: Recipe
  blurred?: boolean
}) => {
  const cooking = useMemo(
    () =>
      recipe.pools
        .find((pool) => pool.nbPerson === 2)
        ?.cookingModes.find((mode) => mode.name === 'Aucun'),
    [recipe],
  )

  const nutrition = useMemo(
    () =>
      recipe.nutritionalInformations.find(
        (nutrition) => nutrition.nbPerson === 2,
      ),
    [recipe],
  )

  return (
    <div className={styles.container}>
      <div className={styles.ingredients}>
        <img className={styles.image} src={recipe.image} alt={recipe.name} />
        {cooking &&
          cooking.stacks.ingredients.map((ingredient) => (
            <div
              className={classNames(styles.item, { blurred })}
              key={ingredient.product.name}
            >
              <b>{ingredient.product.name}</b> :{' '}
              {ingredient.literalQuantity.replace(' ', ' ')}
            </div>
          ))}
        {cooking &&
          cooking.stacks.cupboardIngredients.map((ingredient) => (
            <div
              className={classNames(styles.item, { blurred })}
              key={ingredient.product.name}
            >
              <b>{ingredient.product.name}</b>
              {ingredient.literalQuantity === '0'
                ? ''
                : ` : ${ingredient.literalQuantity.replace(' ', ' ')}`}
            </div>
          ))}
      </div>
      <div>
        <h1 className={classNames(styles.title, { blurred })}>{recipe.name}</h1>
        {cooking && (
          <div className={blurred ? 'blurred' : ''}>
            {nutrition && (
              <Tags
                recipe={{ ...cooking, nutritionalInformation: nutrition }}
              />
            )}
          </div>
        )}
        {cooking &&
          cooking.steps.map((step) => (
            <div key={step.title}>
              <p className={classNames(styles.subtitle, { blurred })}>
                {step.title}
              </p>
              <p className={classNames(styles.description, { blurred })}>
                {step.description}
              </p>
            </div>
          ))}
      </div>
      <FavoriteButton recipe={recipe.id} />
      <BackButton />
    </div>
  )
}

export default FullRecipe
