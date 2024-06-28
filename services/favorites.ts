export const getFavorites = () => {
  const favorites = localStorage.getItem('favorites')
  if (!favorites) {
    return []
  }

  return favorites.split(',')
}
