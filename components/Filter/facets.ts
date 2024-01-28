export const getEmoji = (facets: { name: string }[]) => {
  const names = facets.map(({ name }) => name)

  if (names.includes('Crustacés')) {
    return '🐚'
  }
  if (names.includes('Poisson')) {
    return '🐟'
  }

  if (names.includes('Viande')) {
    return '🍖'
  }
  return '🌱'
}
export const facets = ['Poisson', 'Crustacés', 'Végétarien', 'Viande']

export const facetOptions = facets.map((facet) => ({
  label: facet,
  value: facet,
}))
