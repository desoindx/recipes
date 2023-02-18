import { Ingredient } from './Ingredient';
import { Product } from './Product';

export interface Cooking {
  name: string;
  cookingTime: number;
  waitingTime: number;
  stacks: {
    cupboardIngredients: Ingredient[];
    ingredients: Ingredient[];
  };
  steps: {
    position: number;
    title: string;
    description: string;
  }[];
}

export interface Pool {
  nbPerson: number;
  cookingModes: Cooking[];
}

export interface Recipe {
  id: number;
  name: string;
  image: string;
  pools: Pool[];
}
