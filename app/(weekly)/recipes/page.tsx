import CurrentRecipes from 'components/Recipe/CurrentRecipes'

export const revalidate = 86400

const WeeklyRecipes = async () => {
  const date = new Date()
  return (
    <CurrentRecipes
      startDate={new Date(
        date.setDate(date.getDate() - date.getDay()),
      ).toISOString()}
    />
  )
}

export default WeeklyRecipes
