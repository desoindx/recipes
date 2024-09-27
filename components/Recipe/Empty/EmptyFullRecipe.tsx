import React from 'react'
import { FullRecipe as FullRecipeType } from 'types/Recipe'
import FullRecipe from '../FullRecipe'

const defaultRecipe: FullRecipeType = {
  slug: 'todo',
  image: '/loading.jpg',
  facets: [],
  name: 'Aucun',
  kiloCalorie: 0,
  cookingTime: 30,
  waitingTime: 45,
  ingredients: [
    { id: 0, literalQuantity: '0', quantity: 0, name: 'Sel' },
    { id: 0, literalQuantity: '0', quantity: 0, name: 'Poivre' },
    { id: 0, literalQuantity: '0', quantity: 0, name: "Huile d'olive" },
    { id: 0, literalQuantity: '1', quantity: 120, name: 'Carotte' },
    { id: 0, literalQuantity: '200 g', quantity: 200, name: 'Chou kale' },
    { id: 0, literalQuantity: '1', quantity: 50, name: 'Céleri branche' },
    { id: 0, literalQuantity: '1', quantity: 6, name: "Gousse d'ail" },
    {
      id: 0,
      literalQuantity: '120 g',
      quantity: 120,
      name: 'Haricots blancs (g égoutté)',
    },
    {
      id: 0,
      literalQuantity: '1',
      quantity: 40,

      name: 'Herbe mini bouquet garni thym laurier',
    },
    { id: 0, literalQuantity: '1', quantity: 110, name: 'Oignon jaune' },
    {
      id: 0,
      literalQuantity: '2',
      quantity: 50,
      name: 'Pain de campagne en tranches - Maison Salesse (4x25g)',
    },
  ],
  steps: [
    {
      id: 0,
      image: '',
      position: 0,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque enim non nisl feugiat euismod. Fusce molestie accumsan leo, sit amet rutrum leo congue ut. Fusce vel metus sit amet mauris ullamcorper mattis. Curabitur ut lacus sed felis euismod accumsan a ut magna. Aenean eleifend tempor turpis ac accumsan. Nam commodo purus non arcu ornare, id elementum elit ornare. Quisque ac lacinia augue.',
    },
    {
      id: 0,
      image: '',
      position: 1,
      description:
        'Donec lorem elit, malesuada vitae mollis quis, ornare nec augue. Nam scelerisque venenatis leo, ut accumsan urna sodales tempor. Phasellus id enim non dolor vestibulum porttitor.',
    },
    {
      id: 0,
      image: '',
      position: 2,
      description:
        'Nulla ut facilisis leo. Sed sit amet pulvinar dui. Cras interdum tincidunt urna vitae feugiat. Duis suscipit tincidunt nulla non posuere. Duis feugiat, eros in malesuada euismod, magna elit venenatis risus, at tincidunt augue ipsum ut justo. Vivamus sit amet risus tortor. Integer nisl arcu, tincidunt at massa at, rutrum ornare tortor. Cras ut velit at turpis bibendum bibendum eget nec ante. Duis ultrices gravida pellentesque.',
    },
  ],
}

const EmptyFullRecipe = () => <FullRecipe recipe={defaultRecipe} blurred />

export default EmptyFullRecipe
