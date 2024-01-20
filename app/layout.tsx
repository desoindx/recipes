import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next'
import { Header } from 'components/Header'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Weekly recipes',
  description: 'Vos recettes hebdomadaires, de saison :)',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="fr">
    <body>
      <Header />
      <Analytics />
      <main>{children}</main>
    </body>
  </html>
)

export default RootLayout
