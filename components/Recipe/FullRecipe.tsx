import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Cooking, Recipe } from 'types/Recipe'
import styles from './fullRecipe.module.css'

const FullRecipe = ({
  recipe,
  blurred,
}: {
  recipe: Recipe
  blurred: boolean
}) => {
  const router = useRouter()
  const [cooking, setCooking] = useState<Cooking>()

  useEffect(() => {
    const cookingMode = recipe.pools
      .find((pool) => pool.nbPerson === 2)
      ?.cookingModes.find((mode) => mode.name === 'Aucun')
    if (cookingMode) {
      setCooking(cookingMode)
    }
  }, [recipe])

  return (
    <div className={styles.container}>
      <div>
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
        <div className={classNames(styles.title, { blurred })}>
          {recipe.name}
        </div>
        {cooking && (
          <div className={classNames(styles.titleInfo, { blurred })}>
            {cooking.waitingTime}min ({cooking.cookingTime} de prépa)
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
      <button
        className={styles.previousButton}
        onClick={() => {
          router.back()
        }}
      >
        Retour
      </button>
    </div>
  )
}

export default FullRecipe
