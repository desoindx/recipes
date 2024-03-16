import { Suspense } from 'react'
import EmptyRecipes from 'components/Recipe/Empty/EmptyRecipes'

const WeeklyLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<EmptyRecipes />}>{children}</Suspense>
)

export default WeeklyLayout
