import React from 'react'
import { Box, Title } from './recipe.styles'

const EmptyRecipe = () => (
  <Box empty>
    <img src="/loading.jpeg" alt="Chargement..." />
    <Title blurred>Titre de recette en cours</Title>
  </Box>
)

export default EmptyRecipe
