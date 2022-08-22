import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { getRecipes } from "services/recipes";
import { Product } from "types/Product";
import Recipes from "../components/Recipes";
import SelectedRecipes from "../components/SelectedRecipes";

export default function Home({
  recipes,
  id,
}: {
  recipes: Product[];
  id: number;
}): JSX.Element {
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    const existingSelectedRecipes = localStorage.getItem(`recipes-${id}`);
    if (existingSelectedRecipes) {
      setSelectedRecipes(existingSelectedRecipes.split(","));
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`recipes-${id}`, selectedRecipes.join(","));
  }, [id, selectedRecipes]);

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
        recipes={recipes.filter(
          (recipe) => !selectedRecipes.includes(recipe.id)
        )}
        selectRecipe={(recipe) => {
          setSelectedRecipes([...selectedRecipes, recipe]);
        }}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  recipes: Product[];
  id: number;
}> = async () => {
  const { recipes, id } = await getRecipes();
  return {
    props: {
      recipes,
      id,
    },
  };
};
