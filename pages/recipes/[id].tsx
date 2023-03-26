import Button from 'components/Button';
import Buttons from 'components/Button/Buttons';
import Recipes from 'components/Recipe/Recipes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { fetchCached } from 'services/agent';
import { getLocalStorageItem } from 'services/dates';
import { Product } from 'types/Product';

const WeeklyRecipes = () => {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Product[]>([]);
  const [startDate, setStartDate] = useState('');

  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [nextPath, setNextPath] = useState<string>();
  const [previousPath, setPreviousPath] = useState<string>();

  useEffect(() => {
    if (router.query.id) {
      setRecipes([]);
      setStartDate('');
      fetchCached(`/api/recipes/${router.query.id}`).then((data) => {
        setRecipes(data.recipes);
        setStartDate(data.startDate);
      });
    }
  }, [router]);

  useEffect(() => {
    const weekRecipes = localStorage.getItem(
      getLocalStorageItem(new Date(startDate)),
    );
    if (weekRecipes) {
      setSelectedRecipes(weekRecipes.split(','));
    } else {
      setSelectedRecipes([]);
    }
  }, [startDate]);

  useEffect(() => {
    const now = new Date(startDate);
    for (let i = 0; i < 200; i++) {
      now.setDate(now.getDate() + 7);
      if (localStorage.getItem(getLocalStorageItem(now))) {
        setNextPath(now.toISOString());
        return;
      }
    }
    setNextPath('');
  }, [startDate]);

  useEffect(() => {
    const now = new Date(startDate);
    for (let i = 0; i < 200; i++) {
      now.setDate(now.getDate() - 7);
      if (localStorage.getItem(getLocalStorageItem(now))) {
        setPreviousPath(now.toISOString());
        return;
      }
    }
    setPreviousPath('');
  }, [startDate]);

  return (
    <>
      <Recipes
        startDate={startDate}
        recipes={recipes.filter((recipe) =>
          selectedRecipes.includes(recipe.id),
        )}
        selectRecipe={(recipe: string) => {
          router.push(`/recipe/${recipe}`);
        }}
        showRecipe
      />
      {(nextPath || previousPath) && (
        <Buttons>
          {previousPath && (
            <Button onClick={() => router.push(previousPath)}>
              Voir la semaine précendante
            </Button>
          )}
          {nextPath && (
            <Button onClick={() => router.push(nextPath)}>
              Voir la semaine suivante
            </Button>
          )}
        </Buttons>
      )}
    </>
  );
};

export default WeeklyRecipes;
