import { gql, GraphQLClient } from "graphql-request";
import { CategorySlug } from "types/Enums/Category";
import { PlanningResponse, RecipeResponse } from "types/Response";
import { getBackDate } from "./dates";

const graphQLClient = new GraphQLClient("https://mgs.quitoque.fr/graphql", {
  headers: {
    "Content-Type": "application/json",
  },
});

const excludedFacets = ["Poisson", "Crustacés"];

export const getRecipes = async (startDate?: string) => {
  const query = gql`
    query planning($id: ID!) {
      planning(id: $id) {
        id
        startDate
        planningCategories {
          category {
            name
            slug
          }
          products {
            id
            nbPerson
            name
            images
            nutritionalInformation {
              kiloCalorie
            }
            subProducts {
              literalQuantity
              quantity
              product {
                name
                weight
              }
            }
            facets {
              name
            }
          }
        }
      }
    }
  `;
  try {
    const result = (await graphQLClient.request(query, {
      id: getBackDate(startDate),
    })) as PlanningResponse;
    return {
      startDate: result.planning.startDate,
      recipes: result.planning.planningCategories
        .find((planning) => planning.category.slug === CategorySlug.TO_COOK)
        .products.filter((product) => product.nbPerson === 2)
        .filter(
          (product) =>
            !product.facets.some((facet) => excludedFacets.includes(facet.name))
        ),
    };
  } catch (err) {
    console.error("API has returned error", err);
  }
};

export const getRecipe = async (id: string) => {
  const query = gql`
    query recipe($id: ID!) {
      recipe(id: $id) {
        id
        name
        pools {
          nbPerson
          cookingModes {
            name
            steps {
              position
              title
              description
            }
          }
        }
      
      }
    }
  `;
  try {
    const result = (await graphQLClient.request(query, {
      id: id.split('-')[1],
    })) as RecipeResponse;
    return result.recipe;
  } catch (err) {
    console.error("API has returned error", err);
  }
};
