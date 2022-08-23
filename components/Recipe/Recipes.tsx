import { getFrontDate } from "services/dates";
import { Product } from "types/Product";
import Recipe from ".";
import { Container, AllRecipes, Header, Select } from "./recipes.styles";
import { useEffect, useState } from "react";

const filterOptions = [
  {
    label: "Poisson",
    value: "Poisson",
  },
  {
    label: "Crustacés",
    value: "Crustacés",
  },
  {
    label: "Végétarien",
    value: "Végétarien",
  },
  {
    label: "Viande",
    value: "Viande",
  },
];

const Recipes = ({
  startDate,
  recipes,
  selectRecipe,
  showRecipe,
  withFilter,
}: {
  startDate: string;
  recipes: Product[];
  selectRecipe: (id: string) => void;
  showRecipe?: boolean;
  withFilter?: boolean;
}) => {
  const [filter, setFilter] = useState<string[]>();

  useEffect(() => {
    setFilter(
      localStorage.getItem("filter")?.split(",") ||
        filterOptions.map((option) => option.value)
    );
  }, []);

  useEffect(() => {
    if (filter) {
      localStorage.setItem("filter", filter.join(","));
    }
  }, [filter]);

  return (
    <Container>
      <Header>
        <span>Recettes de la semaine du {getFrontDate(startDate)}</span>
        {withFilter && filter && (
          <Select
            isMulti
            defaultValue={filterOptions.filter((option) =>
              filter.includes(option.value)
            )}
            options={filterOptions}
            onChange={(value: any[]) => setFilter(value.map((option) => option.value))}
          />
        )}
      </Header>
      <AllRecipes>
        {recipes
          .filter((product) =>
            product.facets.some(
              (facet) => filter && filter.includes(facet.name)
            )
          )
          .map((recipe) => (
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
