import { gql, GraphQLClient } from "graphql-request";
import { CategorySlug } from "types/Enums/Category";
import { PlanningResponse } from "types/Response";

const graphQLClient = new GraphQLClient("https://mgs.quitoque.fr/graphql", {
  headers: {
    "Content-Type": "application/json",
  },
});

const excludedFacets = ["Poisson", "Crustacés"];
export const getRecipes = async () => {
  const query = gql`
    query planning($id: ID!) {
      planning(id: $id) {
        id
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
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const date = `${nextWeek.getFullYear()}-${String(
    nextWeek.getMonth() + 1
  ).padStart(2, "0")}-${String(nextWeek.getDate()).padStart(2, "0")}`;
  try {
    const result = (await graphQLClient.request(query, {
      id: date,
    })) as PlanningResponse;
    return {
      id: result.planning.id,
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
