import { getRecipes } from 'services/recipes'
import SelectableRecipes from 'components/Recipe/SelectableRecipes'

export const revalidate = 3600 * 24

const Home = async () => {
  const result = await getRecipes(new Date())

  return (
    <div className="main-container">
      {result && (
        <SelectableRecipes
          recipes={result}
          startDate={new Date().toISOString()}
        />
      )}
    </div>
  )
}

export default Home
