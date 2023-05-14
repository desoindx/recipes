const cache = {}

export const fetchCached = async (link: string) => {
  const cached = cache[link]
  if (cached) {
    return cached
  }

  const response = await fetch(link)
  const result = response.json()
  cache[link] = result
  return result
}
