import { getRecipes } from 'services/recipes'
import SelectableRecipes from 'components/Recipe/SelectableRecipes'

export const revalidate = 3600 * 24

const Home = async () => {
  const result = await getRecipes()

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
