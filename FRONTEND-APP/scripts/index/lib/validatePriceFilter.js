export const validatePrice = ({ minValue, maxValue }) => {
  const price = {}
  const errors = []
  if (!minValue && !maxValue) {
    errors.push('Provide min or max values')
  }

  if (minValue && !maxValue) {
    price.min = minValue
    price.max = null
  }

  if (maxValue && !minValue) {
    price.max = maxValue
    price.min = null
  }

  if (minValue && maxValue && +minValue >= +maxValue) {
    errors.push('MAX has to be greater than MIN')
  }

  return { price, errors }
}