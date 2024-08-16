export const getFrontDate = (startDate: string): string => {
  if (!startDate) {
    return '...'
  }

  const idDate = new Date(startDate)
  return idDate.toISOString().split('T')[0].split('-').reverse().join('/')
}

export const getBackDate = (startDate?: string): string => {
  let date
  if (!startDate || startDate === 'now') {
    date = new Date()
    date.setDate(date.getDate() + 7)
  } else {
    date = new Date(startDate)
  }
  date.setDate(date.getDate() + 1)

  return date.toISOString().split('T')[0]
}

export const getLocalStorageItem = (date: Date): string =>
  `recipes-${date.toDateString()}`
