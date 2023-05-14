import { Category } from './Category'
import { Product } from './Product'

export interface Planning {
  id: string
  startDate: string
  planningCategories: {
    category: Category
    products: Product[]
  }[]
}
