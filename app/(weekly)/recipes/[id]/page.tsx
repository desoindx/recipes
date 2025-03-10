import CurrentRecipes from 'components/Recipe/CurrentRecipes'

type Props = { params: Promise<{ id: string }> }

const WeeklyRecipes = async (props: Props) => {
  const params = await props.params

  return <CurrentRecipes startDate={params.id} />
}

export default WeeklyRecipes
