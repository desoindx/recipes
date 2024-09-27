import { Ingredient, Recipe, Step } from '@prisma/client'

export type FullRecipe = Recipe & {
  ingredients: Omit<Ingredient, 'recipeId'>[]
  steps: Omit<Step, 'recipeId'>[]
}
