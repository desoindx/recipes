export interface Product {
  id: string;
  nbPerson: number;
  name: string;
  images: string[];
  nutritionalInformation: {
    kiloCalorie: number;
  };
  subProducts: {
    literalQuantity: string;
    quantity: number;
    product: {
      name: string;
      weight: number;
    };
  }[];
  facets: {
    name: string;
  }[];
}
