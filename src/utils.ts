export const cssToCamelCase = (str: string): string => {
  const splitted = str.split('-')
  if (splitted.length === 1) return splitted[0]

  return (
    splitted[0] +
    splitted
      .slice(1)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join('')
  )
}

export const attributeToNumber = (value: string): string | number => {
  if (value.includes('px')) return value
  return Number(value)
}
