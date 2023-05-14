import React from 'react'
import { Product } from 'types/Product'
import {
  Box,
  Description,
  Item,
  Nutriscore,
  ProductsList,
  Title,
} from './recipe.styles'

const Recipe = ({
  recipe,
  onClick,
  withProducts,
  detailOnHover,
}: {
  recipe: Product
  onClick: (id: string) => void
  withProducts?: boolean
  detailOnHover?: boolean
}) => (
  <Box
    key={recipe.name}
    onClick={() => onClick(recipe.id)}
    detailOnHover={detailOnHover}
  >
    <img src={recipe.images[0]} alt={recipe.name} />
    {recipe.nutriscore && (
      <Nutriscore
        src={`https://www.quitoque.fr/static/images/picto/nutri-score-${recipe.nutriscore.toLowerCase()}.svg`}
        alt={`Nutriscore: ${recipe.nutriscore}`}
      />
    )}
    <Title>{recipe.name}</Title>
    <Description detailOnHover={detailOnHover}>
      {recipe.waitingTime}min ({recipe.cookingTime} de prépa),{' '}
      {recipe.nutritionalInformation.kiloCalorie} kcal
    </Description>
    <ProductsList withProducts={withProducts}>
      {recipe.subProducts.map((product) => (
        <Item key={product.product.name}>
          <b>{product.product.name}</b> : {product.literalQuantity}
        </Item>
      ))}
    </ProductsList>
  </Box>
)

export default Recipe
