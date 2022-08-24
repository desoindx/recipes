import FullRecipe from "components/Recipe/FullRecipe";
import { GetServerSideProps } from "next";
import React from "react";
import { getRecipe } from "services/recipes";
import { Recipe } from "types/Recipe";

const recipe = ({ recipe }: { recipe: Recipe }) => {
  return <FullRecipe recipe={recipe} />;
};

export const getServerSideProps: GetServerSideProps<{
  recipe: Recipe;
}> = async (context) => {
  const { startDate, id } = context.params;
  const recipe = await getRecipe(startDate as string, id as string);
  return {
    props: {
      recipe,
    },
  };
};

export default recipe;
