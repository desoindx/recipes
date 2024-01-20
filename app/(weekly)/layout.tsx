import { Metadata } from 'next'
import { Suspense } from 'react'
import EmptyRecipes from 'components/Recipe/Empty/EmptyRecipes'

export const metadata: Metadata = {
  title: 'Weekly recipes',
  description: 'Vos recettes hebdomadaires, de saison :)',
}

const WeeklyLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<EmptyRecipes />}>{children}</Suspense>
)

export default WeeklyLayout
