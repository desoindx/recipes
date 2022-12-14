import { Ingredient } from "./Ingredient";

export interface Product {
  id: string;
  nbPerson: number;
  name: string;
  images: string[];
  nutriscore: string;
  nutritionalInformation: {
    kiloCalorie: number;
  };
  subProducts: Ingredient[];
  facets: {
    name: string;
  }[];
}
