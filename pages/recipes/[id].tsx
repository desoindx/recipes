import Button from "components/Button";
import Buttons from "components/Button/Buttons";
import Recipes from "components/Recipe/Recipes";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getLocalStorageItem } from "services/dates";
import { getRecipes } from "services/recipes";
import { Product } from "types/Product";

const WeeklyRecipes = ({
  recipes,
  startDate,
}: {
  recipes: Product[];
  startDate: string;
}) => {
  const router = useRouter();
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [nextPath, setNextPath] = useState<string>();
  const [previousPath, setPreviousPath] = useState<string>();

  useEffect(() => {
    const weekRecipes = localStorage.getItem(
      getLocalStorageItem(new Date(startDate))
    );
    if (weekRecipes) {
      setSelectedRecipes(weekRecipes.split(","));
    } else {
      setSelectedRecipes([]);
    }
  }, [startDate]);

  useEffect(() => {
    const now = new Date(startDate);
    for (let i = 0; i < 200; i++) {
      now.setDate(now.getDate() + 7);
      if (localStorage.getItem(getLocalStorageItem(now))) {
        setNextPath(now.toISOString());
        return;
      }
    }
    setNextPath('')
  }, [startDate]);

  useEffect(() => {
    const now = new Date(startDate);
    for (let i = 0; i < 200; i++) {
      now.setDate(now.getDate() - 7);
      if (localStorage.getItem(getLocalStorageItem(now))) {
        setPreviousPath(now.toISOString());
        return;
      }
    }
    setPreviousPath('')
  }, [startDate]);

  return (
    <>
      <Recipes
        startDate={startDate}
        recipes={recipes.filter((recipe) =>
          selectedRecipes.includes(recipe.id)
        )}
        selectRecipe={(recipe: string) => {
          router.push(`/recipe/${startDate}/${recipe}`);
        }}
        showRecipe
      />
      {(nextPath || previousPath) && (
        <Buttons>
          {previousPath && (
            <Button onClick={() => router.push(previousPath)}>
              Voir la semaine précendante
            </Button>
          )}
          {nextPath && (
            <Button onClick={() => router.push(nextPath)}>
              Voir la semaine suivante
            </Button>
          )}
        </Buttons>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  recipes: Product[];
  startDate: string;
}> = async (context) => {
  const { id } = context.params;
  const { recipes, startDate } = await getRecipes(id as string);
  return {
    props: {
      recipes,
      startDate,
    },
  };
};

export default WeeklyRecipes;
