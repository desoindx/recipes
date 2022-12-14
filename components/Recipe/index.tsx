import React from "react";
import { Product } from "types/Product";
import { Box, Item, Nutriscore, Title } from "./recipe.styles";

const Recipe = ({
  recipe,
  onClick,
  withProducts,
}: {
  recipe: Product;
  onClick: (id: string) => void;
  withProducts?: boolean;
}) => {
  return (
    <Box key={recipe.name} onClick={() => onClick(recipe.id)}>
      <img src={recipe.images[0]} alt={recipe.name} />
      <Nutriscore
        src={`https://www.quitoque.fr/static/images/picto/nutri-score-${recipe.nutriscore.toLowerCase()}.svg`}
        alt={`Nutriscore: ${recipe.nutriscore}`}
      />
      <Title>
        {recipe.name} ({recipe.nutritionalInformation.kiloCalorie} kcal)
      </Title>
      {withProducts &&
        recipe.subProducts.map((product) => (
          <Item key={product.product.name}>
            <b>{product.product.name}</b> : {product.literalQuantity}
          </Item>
        ))}
    </Box>
  );
};

export default Recipe;
