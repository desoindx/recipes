import { Suspense } from 'react'
import EmptyFullRecipe from 'components/Recipe/Empty/EmptyFullRecipe'

const WeeklyLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<EmptyFullRecipe />}>{children}</Suspense>
)

export default WeeklyLayout
