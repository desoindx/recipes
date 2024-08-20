import { getRecipes } from 'services/recipes'
import SelectableRecipes from 'components/Recipe/SelectableRecipes'

export const revalidate = 3600 * 24
export const maxDuration = 60

const Home = async () => {
  console.log('revalidate home')
  const result = await getRecipes(new Date())

  return (
    <div className="main-container">
      {result && (
        <SelectableRecipes
          recipes={result.recipes}
          startDate={result.startDate}
        />
      )}
    </div>
  )
}

export default Home
