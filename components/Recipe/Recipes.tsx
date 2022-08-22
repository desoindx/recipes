import { getFrontDate } from "services/dates";
import { Product } from "types/Product";
import Recipe from ".";
import { Title, Container } from "./recipes.styles";

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
    <div>
      <Title>Recettes de la semaine du {getFrontDate(startDate)}</Title>
      <Container>
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.id}
            recipe={recipe}
            onClick={selectRecipe}
            withProducts={!showRecipe}
          />
        ))}
      </Container>
    </div>
  );
};

export default Recipes;
