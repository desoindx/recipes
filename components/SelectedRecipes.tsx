import React, { useEffect, useState } from "react";
import { Product } from "types/Product";
import Recipe from "./Recipe";
import {
  Button,
  Container,
  Item,
  Items,
  Title,
} from "./selectedRecipes.styles";

const allQuantityTypes = ["g", "mL", ""];

const SelectedRecipes = ({
  recipes,
  unselectRecipe,
}: {
  recipes: Product[];
  unselectRecipe: (id: string) => void;
}) => {
  const [seeRecipes, setSeeRecipes] = useState(true);
  const [products, setProducts] = useState<Record<string, number>>({});
  const [quantityTypes, setQuantityTypes] = useState<
    Record<string, { type: string; base: number }>
  >({});
  useEffect(() => {
    const newProducts = {};
    const newQuantityTypes = {};
    recipes.forEach((recipe) =>
      recipe.subProducts.forEach((product) => {
        const existingQuantity = newProducts[product.product.name] || 0;
        newProducts[product.product.name] =
          existingQuantity + product.quantity / product.product.weight;

        const quantityType = allQuantityTypes.find((type) =>
          product.literalQuantity.includes(type)
        );
        newQuantityTypes[product.product.name] = {
          type: quantityType,
          base: product.product.weight,
        };
      })
    );
    setProducts(newProducts);
    console.log(newQuantityTypes);
    setQuantityTypes(newQuantityTypes);
  }, [recipes]);
  return (
    <Container>
      {seeRecipes ? (
        <>
          <Title>
            {recipes.length} recette{recipes.length > 1 && "s"} sélectionée
            {recipes.length > 1 && "s"}
          </Title>
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              onClick={() => unselectRecipe(recipe.id)}
            />
          ))}
        </>
      ) : (
        <Items>
          {Object.entries(products).map(([name, weight]) => {
            const existingType = quantityTypes[name];
            const roundedWeight = +parseFloat(weight.toString()).toFixed(2);
            const roundedBase = +parseFloat((weight * existingType.base).toString()).toFixed(2);
            const quantity = existingType.type
              ? `${roundedBase} ${existingType.type}`
              : `${roundedWeight} (${roundedBase}g)`;
            return (
              <Item key={name}>
                <>
                  {name}: {quantity}
                </>
              </Item>
            );
          })}
        </Items>
      )}
      <Button onClick={() => setSeeRecipes(!seeRecipes)}>
        Voir {seeRecipes ? "la liste de course" : "les recettes choisies"}
      </Button>
    </Container>
  );
};

export default SelectedRecipes;
