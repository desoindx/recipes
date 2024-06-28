import { Ingredient } from './Ingredient'

export interface Product {
  id: string
  nbPerson: number
  name: string
  images: string[]
  nutriscore: string
  cookingTime: number
  waitingTime: number
  nutritionalInformation: {
    kiloCalorie: number
  }
  subProducts: Ingredient[]
  facets: {
    name: string
  }[]
}
