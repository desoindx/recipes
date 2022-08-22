import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Recipe } from "types/Recipe";
import {
  Container,
  Description,
  PreviousButton,
  Subtitle,
  Title,
} from "./fullRecipe.styles";

const FullRecipe = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter();
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const newSteps = recipe.pools
      .find((pool) => pool.nbPerson === 2)
      .cookingModes.find((cookingMode) => cookingMode.name === "Aucun").steps;
    newSteps.sort((a, b) => a.position - b.position);
    setSteps(newSteps);
  }, [recipe]);
  
  return (
    <Container>
      <Title>{recipe.name}</Title>
      {steps.map((step) => {
        return (
          <>
            <Subtitle>{step.title}</Subtitle>
            <Description>{step.description}</Description>
          </>
        );
      })}
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
