import Recipe from "components/Recipe";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Product } from "types/Product";
import selectStyles from "components/Select/styles";
import { AllRecipes } from "components/Recipe/recipes.styles";
import { facetOptions, facets } from "components/Select/facets";
import { Selects } from "./leftover.styles";

const Leftover = ({
  plannings,
}: {
  plannings: {
    recipes: Product[];
    startDate: string;
  }[];
}) => {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState<string[]>();

  useEffect(() => {
    setFilter(localStorage.getItem("filter")?.split(",") || facets);
  }, []);

  useEffect(() => {
    if (filter) {
      localStorage.setItem("filter", filter.join(","));
    }
  }, [filter]);

  useEffect(() => {
    const planningsProduct = plannings.flatMap((planning) =>
      planning.recipes.flatMap((recipe) =>
        recipe.subProducts.map((product) => product.product.name)
      )
    );

    setAllProducts(
      [...new Set(planningsProduct)].sort((a, b) => a.localeCompare(b))
    );
  }, [plannings]);

  return (
    <div>
      <Selects>
        <Select
          isMulti
          options={allProducts.map((product) => ({
            label: product,
            value: product,
          }))}
          onChange={(value) => setProducts(value.map((option) => option.value))}
          styles={selectStyles}
        />
        {filter && (
          <Select
            isMulti
            options={facetOptions}
            defaultValue={facetOptions.filter((option) =>
              filter.includes(option.value)
            )}
            onChange={(values) =>
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
      </Selects>
      <AllRecipes>
        {products.length > 0 &&
          plannings
            .flatMap((planning) =>
              planning.recipes
                .filter((product) =>
                  product.facets.some(
                    (facet) => filter && filter.includes(facet.name)
                  )
                )
                .filter((recipe) =>
                  products.every((product) =>
                    recipe.subProducts.find(
                      (recipeProduct) => recipeProduct.product.name === product
                    )
                  )
                )
                .map((recipe) => ({ recipe, startDate: planning.startDate }))
            )
            .filter(({ recipe }, index, recipes) => {
              return (
                recipes.findIndex((r) => r.recipe.id === recipe.id) === index
              );
            })
            .map(({ recipe }) => (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                onClick={() => router.push(`/recipe/${recipe.id}`)}
                withProducts
              />
            ))}
      </AllRecipes>
    </div>
  );
};

export default Leftover;
