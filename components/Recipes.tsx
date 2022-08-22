import { Product } from "types/Product";
import Recipe from "./Recipe";
import { Container } from "./recipes.styles";

const Recipes = ({
  recipes,
  selectRecipe,
}: {
  recipes: Product[];
  selectRecipe: (id: string) => void;
}) => {
  return (
    <Container>
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.id}
          recipe={recipe}
          onClick={selectRecipe}
          withProducts
        />
      ))}
    </Container>
  );
};

export default Recipes;
