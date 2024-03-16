import { GraphQLClient, gql } from 'graphql-request'
import { CategorySlug } from 'types/Enums/Category'
import { Product } from 'types/Product'
import { Recipe } from 'types/Recipe'
import { PlanningResponse, RecipeResponse } from 'types/Response'
import { getBackDate } from './dates'

const graphQLClient = new GraphQLClient('https://mgs.quitoque.fr/graphql', {
  headers: {
    'Content-Type': 'application/json',
  },
})

const recipes: Record<string, { recipes: Product[]; startDate: string }> = {}
export const getRecipes = async (startDate?: string) => {
  const cached = recipes[startDate || 'now']
  if (cached) {
    return cached
  }

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
            nutriscore
            cookingTime
            waitingTime
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
  `
  try {
    const { planning } = (await graphQLClient.request(query, {
      id: getBackDate(startDate),
    })) as PlanningResponse
    const result = {
      startDate: planning.startDate,
      recipes:
        planning.planningCategories
          .find(({ category }) => category.slug === CategorySlug.TO_COOK)
          ?.products.filter((product) => product.nbPerson === 2) || [],
    }
    recipes[planning.startDate || 'now'] = result
    return result
  } catch (err) {
    console.error('API has returned error', err)
    return null
  }
}

const recipe: Record<string, Recipe> = {}
export const getRecipe = async (id: string): Promise<Recipe | null> => {
  const cachedRecipe = recipe[id]
  if (cachedRecipe) {
    return cachedRecipe
  }

  const query = gql`
    query recipe($id: ID!) {
      recipe(id: $id) {
        id
        name
        image
        pools {
          nbPerson
          cookingModes {
            cookingTime
            waitingTime
            name
            stacks {
              cupboardIngredients {
                literalQuantity
                quantity
                product {
                  name
                  weight
                }
              }
              ingredients {
                literalQuantity
                quantity
                product {
                  name
                  weight
                }
              }
            }
            steps {
              position
              title
              description
            }
          }
        }
      }
    }
  `
  try {
    const result = (await graphQLClient.request(query, {
      id: id.split('-')[1],
    })) as RecipeResponse
    recipe[id] = result.recipe
    return result.recipe
  } catch (err) {
    console.error('API has returned error', err)
    return null
  }
}

export const getAllRecipes = async () => {
  const initialRecipes = await getRecipes()
  if (initialRecipes) {
    const allRecipes = [initialRecipes]
    const now = new Date(initialRecipes.startDate)
    now.setDate(now.getDate() - 28)
    for (let i = 0; i < 6; i++) {
      now.setDate(now.getDate() + 7)
      if (i === 4) {
        // eslint-disable-next-line no-continue
        continue
      }

      // eslint-disable-next-line no-await-in-loop
      const result = await getRecipes(now.toISOString())
      if (result) {
        allRecipes.push(result)
      }
    }

    return allRecipes.filter((x) => x)
  }
  return []
}
