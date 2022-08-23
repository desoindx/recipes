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

  useEffect(() => {}, [products, filter]);

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
            onChange={(value: any[]) =>
              setFilter(value.map((option) => option.value))
            }
            styles={selectStyles}
          />
        )}
      </Selects>
      <AllRecipes>
        {plannings.flatMap((planning) =>
          planning.recipes
            .filter((product) =>
              product.facets.some(
                (facet) => filter && filter.includes(facet.name)
              )
            )
            .filter((recipe) =>
              recipe.subProducts.some((product) =>
                products.includes(product.product.name)
              )
            )
            .map((recipe) => (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                onClick={() =>
                  router.push(`/recipe/${planning.startDate}/${recipe.id}`)
                }
                withProducts
              />
            ))
        )}
      </AllRecipes>
    </div>
  );
};

export default Leftover;