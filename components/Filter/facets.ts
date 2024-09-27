export const getEmoji = (facets: string[]) => {
  if (facets.includes('Crustacés')) {
    return '🐚'
  }
  if (facets.includes('Poisson')) {
    return '🐟'
  }

  if (facets.includes('Viande')) {
    return '🍖'
  }
  return '🌱'
}
export const facets = ['Poisson', 'Crustacés', 'Végétarien', 'Viande']

export const facetOptions = facets.map((facet) => ({
  label: facet,
  value: facet,
}))
