import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Cooking, Recipe } from "types/Recipe";
import {
  Container,
  Description,
  PreviousButton,
  Subtitle,
  Title,
  Image,
  Item,
} from "./fullRecipe.styles";

const FullRecipe = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter();
  const [cooking, setCooking] = useState<Cooking>();

  useEffect(() => {
    const cookingMode = recipe.pools
      .find((pool) => pool.nbPerson === 2)
      .cookingModes.find((cookingMode) => cookingMode.name === "Aucun");
    setCooking(cookingMode);
  }, [recipe]);

  return (
    <Container>
      <div>
        <Image src={recipe.image} alt={recipe.name} />
        {cooking &&
          cooking.stacks.ingredients.map((ingredient) => (
            <Item key={ingredient.product.name}>
              {ingredient.product.name}: {ingredient.literalQuantity}
            </Item>
          ))}
        {cooking &&
          cooking.stacks.cupboardIngredients.map((ingredient) => (
            <Item key={ingredient.product.name}>
              {ingredient.product.name}
              {ingredient.literalQuantity === "0"
                ? ""
                : `: ${ingredient.literalQuantity}`}
            </Item>
          ))}
      </div>
      <div>
        <Title>{recipe.name}</Title>
        {cooking &&
          cooking.steps.map((step) => {
            return (
              <>
                <Subtitle>{step.title}</Subtitle>
                <Description>{step.description}</Description>
              </>
            );
          })}
      </div>
      <PreviousButton
        onClick={() => {
          router.back();
        }}
      >
        Retour
      </PreviousButton>
    </Container>
  );
};

export default FullRecipe;
