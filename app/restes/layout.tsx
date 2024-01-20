import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Weekly recipes',
  description: 'Vos recettes hebdomadaires, de saison :)',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<h1>Chargement de votre placard en cours...</h1>}>
    {children}
  </Suspense>
)

export default RootLayout
