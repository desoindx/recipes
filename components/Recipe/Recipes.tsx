import { Product } from "types/Product";
import Recipe from ".";
import { Container, AllRecipes, Header, Select } from "./recipes.styles";
import { useEffect, useState } from "react";
import selectStyles from "components/Select/styles";
import { facetOptions, facets } from "components/Select/facets";
import { getFrontDate } from "services/dates";

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
    setFilter(localStorage.getItem("filter")?.split(",") || facets);
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
            defaultValue={facetOptions.filter((option) =>
              filter.includes(option.value)
            )}
            options={facetOptions}
            onChange={(values: any[]) =>
              setFilter(
                values.length > 0
                  ? values.map((option) => option.value)
                  : facetOptions.map((option) => option.value)
              )
            }
            value={facetOptions.filter((option) =>
              filter.includes(option.value)
            )}
            styles={selectStyles}
          />
        )}
      </Header>
      <AllRecipes>
        {(withFilter
          ? recipes.filter((product) =>
              product.facets.some(
                (facet) => filter && filter.includes(facet.name)
              )
            )
          : recipes
        ).map((recipe) => (
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
