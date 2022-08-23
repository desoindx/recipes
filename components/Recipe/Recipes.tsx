import { getFrontDate } from "services/dates";
import { Product } from "types/Product";
import Recipe from ".";
import { Title, Container, AllRecipes } from "./recipes.styles";

const Recipes = ({
  startDate,
  recipes,
  selectRecipe,
  showRecipe,
}: {
  startDate: string;
  recipes: Product[];
  selectRecipe: (id: string) => void;
  showRecipe?: boolean;
}) => {
  return (
    <Container>
      <Title>Recettes de la semaine du {getFrontDate(startDate)}</Title>
      <AllRecipes>
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.id}
            recipe={recipe}
            onClick={selectRecipe}
            withProducts={!showRecipe}
          />
        ))}
      </AllRecipes>
    </Container>
  );
};

export default Recipes;
