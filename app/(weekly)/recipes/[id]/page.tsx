import { getRecipes } from 'services/recipes'
import CurrentRecipes from 'components/Recipe/CurrentRecipes'

export const maxDuration = 60
export const dynamic = 'force-static'
export async function generateStaticParams() {
  return []
}
type Props = { params: Promise<{ id: string }> }

const WeeklyRecipes = async (props: Props) => {
  const params = await props.params

  const result = await getRecipes(decodeURIComponent(params.id))
  if (!result) {
    return null
  }

  return <CurrentRecipes startDate={params.id} recipes={result.recipes} />
}

export default WeeklyRecipes
