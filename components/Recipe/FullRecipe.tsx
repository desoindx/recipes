import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Cooking, Recipe } from 'types/Recipe';
import {
  Container,
  Description,
  PreviousButton,
  Subtitle,
  Title,
  Image,
  Item,
  TitleInfo,
} from './fullRecipe.styles';

const FullRecipe = ({
  recipe,
  blurred,
}: {
  recipe: Recipe;
  blurred: boolean;
}) => {
  const router = useRouter();
  const [cooking, setCooking] = useState<Cooking>();

  useEffect(() => {
    const cookingMode = recipe.pools
      .find((pool) => pool.nbPerson === 2)
      .cookingModes.find((cookingMode) => cookingMode.name === 'Aucun');
    setCooking(cookingMode);
  }, [recipe]);

  return (
    <Container>
      <div>
        <Image src={recipe.image} alt={recipe.name} />
        {cooking &&
          cooking.stacks.ingredients.map((ingredient) => (
            <Item key={ingredient.product.name} blurred={blurred}>
              <b>{ingredient.product.name}</b> :{' '}
              {ingredient.literalQuantity.replace(' ', ' ')}
            </Item>
          ))}
        {cooking &&
          cooking.stacks.cupboardIngredients.map((ingredient) => (
            <Item key={ingredient.product.name} blurred={blurred}>
              <b>{ingredient.product.name}</b>
              {ingredient.literalQuantity === '0'
                ? ''
                : ` : ${ingredient.literalQuantity.replace(' ', ' ')}`}
            </Item>
          ))}
      </div>
      <div>
        <Title blurred={blurred}>{recipe.name}</Title>
        {cooking && (
          <TitleInfo blurred={blurred}>
            {cooking.waitingTime}min ({cooking.cookingTime} de prépa)
          </TitleInfo>
        )}
        {cooking &&
          cooking.steps.map((step) => {
            return (
              <div key={step.title}>
                <Subtitle blurred={blurred}>{step.title}</Subtitle>
                <Description blurred={blurred}>{step.description}</Description>
              </div>
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
