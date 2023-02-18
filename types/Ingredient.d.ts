export interface Ingredient {
  literalQuantity: string;
  quantity: number;
  product: {
    name: string;
    weight: number;
  };
}
