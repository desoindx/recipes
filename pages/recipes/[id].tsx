import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchCached } from 'services/agent'
import { getLocalStorageItem } from 'services/dates'
import { Product } from 'types/Product'
import { ButtonLink } from 'components/Button'
import Buttons from 'components/Button/Buttons'
import Recipes from 'components/Recipe/Recipes'

const WeeklyRecipes = () => {
  const router = useRouter()
  const [recipes, setRecipes] = useState<Product[]>([])
  const [startDate, setStartDate] = useState('')

  const [selectedRecipes, setSelectedRecipes] = useState([])
  const [nextPath, setNextPath] = useState<string>()
  const [previousPath, setPreviousPath] = useState<string>()

  useEffect(() => {
    if (router.query.id) {
      if (router.query.id === 'now') {
        const now = new Date()
        now.setDate(now.getDate() + 7)
        for (let i = 0; i < 200; i++) {
          if (localStorage.getItem(getLocalStorageItem(now))) {
            router.push(`/recipes/${now.toISOString()}`)
            return
          }
          now.setDate(now.getDate() - 1)
        }
      }

      setRecipes([])
      setStartDate('')
      fetchCached(`/api/recipes/${router.query.id}`).then((data) => {
        setRecipes(data.recipes)
        setStartDate(data.startDate)
      })
    }
  }, [router])

  useEffect(() => {
    const weekRecipes = localStorage.getItem(
      getLocalStorageItem(new Date(startDate)),
    )
    if (weekRecipes) {
      setSelectedRecipes(weekRecipes.split(','))
    } else {
      setSelectedRecipes([])
    }
  }, [startDate])

  useEffect(() => {
    const now = new Date(startDate)
    for (let i = 0; i < 200; i++) {
      now.setDate(now.getDate() + 7)
      if (localStorage.getItem(getLocalStorageItem(now))) {
        setNextPath(now.toISOString())
        return
      }
    }
    setNextPath('')
  }, [startDate])

  useEffect(() => {
    const now = new Date(startDate)
    for (let i = 0; i < 200; i++) {
      now.setDate(now.getDate() - 7)
      if (localStorage.getItem(getLocalStorageItem(now))) {
        setPreviousPath(now.toISOString())
        return
      }
    }
    setPreviousPath('')
  }, [startDate])

  return (
    <>
      <Recipes
        startDate={startDate}
        recipes={recipes.filter((recipe) =>
          selectedRecipes.includes(recipe.id),
        )}
        showRecipe
      />
      {(nextPath || previousPath) && (
        <Buttons>
          {previousPath && (
            <ButtonLink href={previousPath}>
              Voir la semaine précendante
            </ButtonLink>
          )}
          {nextPath && (
            <ButtonLink href={nextPath}>Voir la semaine suivante</ButtonLink>
          )}
        </Buttons>
      )}
    </>
  )
}

export default WeeklyRecipes
