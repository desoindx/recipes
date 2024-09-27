import { Ingredient, Recipe, Step } from '@prisma/client'

export type FullRecipe = Omit<Recipe, 'id'> & {
  ingredients: Omit<Ingredient, 'recipeId'>[]
  steps: Omit<Step, 'recipeId'>[]
}
