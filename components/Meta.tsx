import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const Meta = ({ title }: { title?: string }) => {
  const router = useRouter()

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content={
          'Le site internet qui vous aide à faire vos courses hebdomadaire en choisssant des recettes orginales et de saison !'
        }
      />
      <meta
        name="image"
        content={
          'https://particuliers.engie.fr/content/dam/images/480x280/600x400-consommation-electrique-plaque-induction.jpg'
        }
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={router.asPath} />
      <meta property="og:title" content={title || 'Weekly recipes'} />
      <meta
        property="og:description"
        content={
          'Le site internet qui vous aide à faire vos courses hebdomadaire en choisssant des recettes orginales et de saison !'
        }
      />
      <meta
        property="og:image"
        content={
          'https://particuliers.engie.fr/content/dam/images/480x280/600x400-consommation-electrique-plaque-induction.jpg'
        }
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={'xavier desoindre'} />
      <meta name="twitter:title" content={title || 'Weekly recipes'} />
      <meta
        name="twitter:description"
        content={
          'Le site internet qui vous aide à faire vos courses hebdomadaire en choisssant des recettes orginales et de saison !'
        }
      />
      <meta
        name="twitter:image"
        content={
          'https://particuliers.engie.fr/content/dam/images/480x280/600x400-consommation-electrique-plaque-induction.jpg'
        }
      />
    </Head>
  )
}

export default Meta
