import classNames from 'classnames'
import Image from 'next/image'
import React, { ReactNode, useEffect, useState } from 'react'
import { FullRecipe } from 'types/Recipe'
import buttonStyles from 'components/Button/button.module.css'
import Recipe from '.'
import styles from './selectedRecipes.module.css'

const allQuantityTypes = ['g', 'mL', '']

const SelectedRecipes = ({
  recipes,
  unselectRecipe,
}: {
  recipes: FullRecipe[]
  unselectRecipe: (id: string) => void
}) => {
  const [seeRecipes, setSeeRecipes] = useState(true)
  const [copied, setCopied] = useState(false)
  const [hide, setHide] = useState(true)
  const [shoppingList, setShoppingList] = useState<
    { key: string; element: ReactNode; stringValue: string }[]
  >([])

  useEffect(() => {
    const products: Record<string, number> = {}
    const quantityTypes = {}
    recipes.forEach((recipe) =>
      recipe.ingredients.forEach((ingredient) => {
        const existingQuantity = products[ingredient.name] || 0
        products[ingredient.name] = existingQuantity + ingredient.quantity

        const quantityType = allQuantityTypes.find((type) =>
          ingredient.literalQuantity.includes(type),
        )
        quantityTypes[ingredient.name] = {
          type: quantityType,
        }
      }),
    )
    setShoppingList(
      Object.entries(products)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([name, weight]) => {
          const existingType = quantityTypes[name]
          const roundedBase = +parseFloat(weight.toString()).toFixed(2)
          const quantity = `${roundedBase} ${existingType.type}`
          return {
            key: name,
            stringValue: `${name} : ${quantity}`,
            element: (
              <>
                <b>{name}</b> : {quantity}
              </>
            ),
          }
        }),
    )
  }, [recipes])
  return (
    <>
      {recipes.length > 0 && (
        <button
          className={classNames(styles.button, { [styles.hiddenButton]: hide })}
          onClick={() => setHide(!hide)}
        >
          <Image
            width={15}
            height={15}
            src={hide ? './right-arrow.svg' : './left-arrow.svg'}
            alt={
              hide
                ? 'Ouvrir les recettes choisies'
                : 'Fermer les recettes choisies'
            }
          />
        </button>
      )}
      <div
        className={classNames(styles.container, {
          [styles.hiddenContainer]: hide,
        })}
      >
        <button
          className={styles.copyButton}
          onClick={() => {
            navigator.clipboard
              .writeText(
                shoppingList.map((list) => list.stringValue).join('\r\n'),
              )
              .then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 750)
              })
          }}
        >
          <Image
            width={20}
            height={20}
            src="./copy.svg"
            alt="copier la liste"
          />
        </button>
        {copied && <div className={styles.copied}>Copié</div>}
        <span className={styles.title}>
          {recipes.length} recette{recipes.length > 1 && 's'} sélectionée
          {recipes.length > 1 && 's'}
        </span>
        <button
          className={buttonStyles.button}
          onClick={() => setSeeRecipes(!seeRecipes)}
        >
          Voir {seeRecipes ? 'la liste de course' : 'les recettes choisies'}
        </button>

        {seeRecipes ? (
          recipes.map((recipe) => (
            <Recipe
              key={recipe.slug}
              recipe={recipe}
              onClick={() => unselectRecipe(recipe.id)}
              detailOnHover
            />
          ))
        ) : (
          <div className={styles.items}>
            {shoppingList.map(({ key, element }) => (
              <div className={styles.item} key={key}>
                {element}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default SelectedRecipes
