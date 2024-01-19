'use client' 

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { fetchCached } from 'services/agent'
import { getLocalStorageItem } from 'services/dates'
import { Product } from 'types/Product'
import buttonStyles from 'components/Button/button.module.css'
import Recipes from 'components/Recipe/Recipes'
import Link from 'next/link'

const WeeklyRecipes = () => {
  const query = useParams()
  const router = useRouter()
  const [recipes, setRecipes] = useState<Product[]>([])
  const [startDate, setStartDate] = useState('')

  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([])
  const [nextPath, setNextPath] = useState<string>()
  const [previousPath, setPreviousPath] = useState<string>()

  useEffect(() => {
    if (query && query.id) {
      if (query.id === 'now') {
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
      fetchCached(`/api/recipes/${query.id}`).then((data) => {
        setRecipes(data.recipes)
        setStartDate(data.startDate)
      })
    }
  }, [query, router])

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
        <div className={buttonStyles.buttons}>
          {previousPath && (
            <Link className={buttonStyles.linkButton} href={previousPath}>Voir la semaine précendante</Link>
            )}
          {nextPath && (
            <Link className={buttonStyles.linkButton} href={nextPath}>Voir la semaine suivante</Link>
          )}
        </div>
      )}
    </>
  )
}

export default WeeklyRecipes
