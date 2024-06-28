import { Ingredient } from './Ingredient'

export interface Cooking {
  name: string
  cookingTime: number
  waitingTime: number
  stacks: {
    cupboardIngredients: Ingredient[]
    ingredients: Ingredient[]
  }
  steps: {
    position: number
    title: string
    description: string
  }[]
}

export interface Pool {
  nbPerson: number
  cookingModes: Cooking[]
}

export interface Recipe {
  id: string
  name: string
  nutriscore: string
  image: string
  pools: Pool[]
  facets: { name: string }[]
  nutritionalInformations: {
    nbPerson: number
    kiloCalorie: number
  }[]
}
