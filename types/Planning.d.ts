import { Category } from "./Category"
import { Product } from "./Product"

export interface Planning {
  id: number,
  planningCategories: {
    category: Category,
    products: Product[]
  }[]
}