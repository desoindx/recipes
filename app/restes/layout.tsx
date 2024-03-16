import { Suspense } from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<h1>Chargement de votre placard en cours...</h1>}>
    {children}
  </Suspense>
)

export default RootLayout
