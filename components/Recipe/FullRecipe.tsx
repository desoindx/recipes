import classNames from 'classnames'
import React from 'react'
import { FullRecipe as FullRecipeType } from 'types/Recipe'
import BackButton from 'components/Button/BackButton'
import FavoriteButton from 'components/Button/FavoriteButton'
import Tags from 'components/Tag/Tags'
import styles from './fullRecipe.module.css'

const FullRecipe = ({
  recipe,
  blurred,
}: {
  recipe: FullRecipeType
  blurred?: boolean
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.ingredients}>
        <img className={styles.image} src={recipe.image} alt={recipe.name} />
        {recipe.ingredients.map((ingredient) => (
          <div
            className={classNames(styles.item, { blurred })}
            key={ingredient.name}
          >
            <b>{ingredient.name}</b> :{' '}
            {ingredient.literalQuantity.replace(' ', ' ')}
          </div>
        ))}
      </div>
      <div>
        <h1 className={classNames(styles.title, { blurred })}>{recipe.name}</h1>
        <div className={blurred ? 'blurred' : ''}>
          <Tags recipe={recipe} />
        </div>
        {recipe &&
          recipe.steps.map((step) => (
            <div key={step.id} className={styles.step}>
              {step.image && (
                <img className={styles.stepImage} src={step.image} alt="" />
              )}
              <p
                className={classNames(styles.description, { blurred })}
                dangerouslySetInnerHTML={{ __html: step.description }}
              ></p>
            </div>
          ))}
      </div>
      <FavoriteButton recipe={recipe.slug} />
      <BackButton />
    </div>
  )
}

export default FullRecipe
