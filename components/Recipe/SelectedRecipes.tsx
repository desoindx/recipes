import Image from 'next/image'
import React, { ReactNode, useEffect, useState } from 'react'
import { Product } from 'types/Product'
import buttonStyles from 'components/Button/button.module.css'
import classNames from 'classnames'
import Recipe from '.'
import styles from './selectedRecipes.module.css'

const allQuantityTypes = ['g', 'mL', '']

const SelectedRecipes = ({
  recipes,
  unselectRecipe,
}: {
  recipes: Product[]
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
      recipe.subProducts.forEach((product) => {
        const existingQuantity = products[product.product.name] || 0
        products[product.product.name] =
          existingQuantity + product.quantity / product.product.weight

        const quantityType = allQuantityTypes.find((type) =>
          product.literalQuantity.includes(type),
        )
        quantityTypes[product.product.name] = {
          type: quantityType,
          base: product.product.weight,
        }
      }),
    )
    setShoppingList(
      Object.entries(products)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([name, weight]) => {
          const existingType = quantityTypes[name]
          const roundedWeight = +parseFloat(weight.toString()).toFixed(2)
          const roundedBase = +parseFloat(
            (existingType.base * weight).toString(),
          ).toFixed(2)
          const quantity = existingType.type
            ? `${roundedBase} ${existingType.type}`
            : `${roundedWeight} (${roundedBase} g)`
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
        <button className={classNames(styles.button, {[styles.hiddenButton]: hide})}  onClick={() => setHide(!hide)}>
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
      <div className={classNames(styles.container, {[styles.hiddenContainer]: hide})}>
        <button className={styles.copyButton}
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
        {seeRecipes ? (
          <>
            <span className={styles.title}>
              {recipes.length} recette{recipes.length > 1 && 's'} sélectionée
              {recipes.length > 1 && 's'}
            </span>
            {recipes.map((recipe) => (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                onClick={() => unselectRecipe(recipe.id)}
                detailOnHover
              />
            ))}
          </>
        ) : (
          <div className={styles.items}>
            {shoppingList.map(({ key, element }) => (
              <div className={styles.item} key={key}>{element}</div>
            ))}
          </div>
        )}
        <button className={buttonStyles.button} onClick={() => setSeeRecipes(!seeRecipes)}>
          Voir {seeRecipes ? 'la liste de course' : 'les recettes choisies'}
        </button>
      </div>
    </>
  )
}

export default SelectedRecipes
