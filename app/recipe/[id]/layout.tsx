import { Metadata } from 'next'
import { Suspense } from 'react'
import EmptyFullRecipe from 'components/Recipe/Empty/EmptyFullRecipe'

export const metadata: Metadata = {
  title: 'Weekly recipes',
  description: 'Votre recette du jour',
}

const WeeklyLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<EmptyFullRecipe />}>{children}</Suspense>
)

export default WeeklyLayout
