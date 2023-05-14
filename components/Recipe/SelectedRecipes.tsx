import Button from 'components/Button'
import React, { ReactNode, useEffect, useState } from 'react'
import { Product } from 'types/Product'
import Recipe from '.'
import {
  Container,
  Copied,
  CopyButton,
  HideButton,
  Item,
  Items,
  Title,
} from './selectedRecipes.styles'

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
        <HideButton hide={hide} onClick={() => setHide(!hide)}>
          <img
            src={hide ? './right-arrow.svg' : './left-arrow.svg'}
            alt={
              hide
                ? 'Ouvrir les recettes choisies'
                : 'Fermer les recettes choisies'
            }
          />
        </HideButton>
      )}
      <Container hide={hide}>
        <CopyButton
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
          <img src={'./copy.svg'} alt="copier la liste" />
        </CopyButton>
        {copied && <Copied>Copié</Copied>}
        {seeRecipes ? (
          <>
            <Title>
              {recipes.length} recette{recipes.length > 1 && 's'} sélectionée
              {recipes.length > 1 && 's'}
            </Title>
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
          <Items>
            {shoppingList.map(({ key, element }) => (
              <Item key={key}>{element}</Item>
            ))}
          </Items>
        )}
        <Button onClick={() => setSeeRecipes(!seeRecipes)}>
          Voir {seeRecipes ? 'la liste de course' : 'les recettes choisies'}
        </Button>
      </Container>
    </>
  )
}

export default SelectedRecipes
