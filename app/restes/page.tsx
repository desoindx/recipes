import { Metadata } from 'next'
import { getAllRecipes } from 'services/recipes'
import Leftover from 'components/Leftover'

export const revalidate = 86400
export const maxDuration = 60

export const metadata: Metadata = {
  title: 'Utiliser ses restes | Weekly recipes',
  description:
    "Il te reste des epinards et du butternut ? J'ai la recette qu'il te faut !",
}

const Restes = async () => {
  const plannings = await getAllRecipes()

  const planningsProduct = plannings.flatMap((planning) =>
    planning.flatMap((recipe) =>
      recipe.ingredients.map((product) => product.name),
    ),
  )
  return (
    <Leftover
      plannings={plannings.flatMap((planning) => planning)}
      products={[...new Set(planningsProduct)].sort((a, b) =>
        a.localeCompare(b),
      )}
    />
  )
}

export default Restes
