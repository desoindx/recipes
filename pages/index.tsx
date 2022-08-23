import Recipes from "components/Recipe/Recipes";
import SelectedRecipes from "components/Recipe/SelectedRecipes";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "services/dates";
import { getRecipes } from "services/recipes";
import { Product } from "types/Product";

export default function Home({
  recipes,
  startDate,
}: {
  recipes: Product[];
  startDate: string;
}): JSX.Element {
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    const existingSelectedRecipes = localStorage.getItem(getLocalStorageItem(new Date(startDate)));
    if (existingSelectedRecipes) {
      setSelectedRecipes(existingSelectedRecipes.split(","));
    }
  }, [startDate]);

  useEffect(() => {
    localStorage.setItem(getLocalStorageItem(new Date(startDate)), selectedRecipes.join(","));
  }, [startDate, selectedRecipes]);

  return (
    <div className="main-container">
      {selectedRecipes.length > 0 && (
        <SelectedRecipes
          recipes={recipes.filter((recipe) =>
            selectedRecipes.includes(recipe.id)
          )}
          unselectRecipe={(recipe) =>
            setSelectedRecipes(selectedRecipes.filter((r) => r !== recipe))
          }
        />
      )}
      <Recipes
        startDate={startDate}
        recipes={recipes.filter(
          (recipe) => !selectedRecipes.includes(recipe.id)
        )}
        selectRecipe={(recipe) => {
          setSelectedRecipes([...selectedRecipes, recipe]);
        }}
        withFilter
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  recipes: Product[];
  startDate: string;
}> = async () => {
  const { recipes, startDate } = await getRecipes();
  return {
    props: {
      recipes,
      startDate,
    },
  };
};
