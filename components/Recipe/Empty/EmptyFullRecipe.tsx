import React from 'react'
import { Recipe } from 'types/Recipe'
import FullRecipe from '../FullRecipe'

const defaultRecipe: Recipe = {
  id: '0',
  name: 'Chargement en cours',
  image: '/loading.jpg',
  nutriscore: 'A',
  facets: [],
  nutritionalInformations: [],
  pools: [
    {
      nbPerson: 2,
      cookingModes: [
        {
          name: 'Aucun',
          cookingTime: 30,
          waitingTime: 45,
          stacks: {
            cupboardIngredients: [
              {
                literalQuantity: '0',
                quantity: 0,
                product: { name: 'Sel', weight: 0 },
              },
              {
                literalQuantity: '0',
                quantity: 0,
                product: { name: 'Poivre', weight: 0 },
              },
              {
                literalQuantity: '0',
                quantity: 0,
                product: { name: "Huile d'olive", weight: 0 },
              },
            ],
            ingredients: [
              {
                literalQuantity: '1',
                quantity: 120,
                product: { name: 'Carotte', weight: 120 },
              },
              {
                literalQuantity: '200 g',
                quantity: 200,
                product: { name: 'Chou kale', weight: 200 },
              },
              {
                literalQuantity: '1',
                quantity: 50,
                product: { name: 'Céleri branche', weight: 50 },
              },
              {
                literalQuantity: '1',
                quantity: 6,
                product: { name: "Gousse d'ail", weight: 6 },
              },
              {
                literalQuantity: '120 g',
                quantity: 120,
                product: { name: 'Haricots blancs (g égoutté)', weight: 240 },
              },
              {
                literalQuantity: '1',
                quantity: 40,
                product: {
                  name: 'Herbe mini bouquet garni thym laurier',
                  weight: 40,
                },
              },
              {
                literalQuantity: '1',
                quantity: 110,
                product: { name: 'Oignon jaune', weight: 110 },
              },
              {
                literalQuantity: '2',
                quantity: 50,
                product: {
                  name: 'Pain de campagne en tranches - Maison Salesse (4x25g)',
                  weight: 100,
                },
              },
            ],
          },
          steps: [
            {
              position: 0,
              title: 'Preparation',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque enim non nisl feugiat euismod. Fusce molestie accumsan leo, sit amet rutrum leo congue ut. Fusce vel metus sit amet mauris ullamcorper mattis. Curabitur ut lacus sed felis euismod accumsan a ut magna. Aenean eleifend tempor turpis ac accumsan. Nam commodo purus non arcu ornare, id elementum elit ornare. Quisque ac lacinia augue.',
            },
            {
              position: 1,
              title: 'Cuisson',
              description:
                'Donec lorem elit, malesuada vitae mollis quis, ornare nec augue. Nam scelerisque venenatis leo, ut accumsan urna sodales tempor. Phasellus id enim non dolor vestibulum porttitor.',
            },
            {
              position: 2,
              title: 'Dressage',
              description:
                'Nulla ut facilisis leo. Sed sit amet pulvinar dui. Cras interdum tincidunt urna vitae feugiat. Duis suscipit tincidunt nulla non posuere. Duis feugiat, eros in malesuada euismod, magna elit venenatis risus, at tincidunt augue ipsum ut justo. Vivamus sit amet risus tortor. Integer nisl arcu, tincidunt at massa at, rutrum ornare tortor. Cras ut velit at turpis bibendum bibendum eget nec ante. Duis ultrices gravida pellentesque.',
            },
          ],
        },
      ],
    },
  ],
}

const EmptyFullRecipe = () => <FullRecipe recipe={defaultRecipe} blurred />

export default EmptyFullRecipe
