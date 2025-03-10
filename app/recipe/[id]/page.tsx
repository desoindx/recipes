import { Metadata } from 'next'
import { getRecipe } from 'services/recipes'
import FullRecipe from 'components/Recipe/FullRecipe'

export const dynamic = 'force-static'

type Props = { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  return []
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const recipe = await getRecipe(
    `https://www.hellofresh.fr/recipes/${params.id as string}`,
    true,
    true,
  )

  return recipe
    ? {
        title: recipe.name,
        description: 'Votre recette du jour !',
        openGraph: {
          images: recipe.image,
        },
      }
    : {}
}

const Recipe = async (props: Props) => {
  const params = await props.params
  const recipe = await getRecipe(
    `https://www.hellofresh.fr/recipes/${params.id as string}`,
    true,
    true,
  )

  return recipe ? <FullRecipe recipe={recipe} /> : null
}

export default Recipe
