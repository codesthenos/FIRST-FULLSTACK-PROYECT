export const normalizePrice = ({ price }) => {
  if (price.includes('-')) {
    const priceList = price.split('-')

    if (priceList[0] === '') return { $lte: +priceList[1] }

    if (priceList[1] === '') return { $gte: +priceList[0] }

    return { $gte: +priceList[0], $lte: +priceList[1] }
  }
  return +price
}

export const normalizeSort = ({ sort }) => {
  if (sort === 'name') return { name: 1 }
  if (sort === 'name-1') return { name: -1 }
  if (sort === 'price') return { price: 1 }
  if (sort === 'price-1') return { price: -1 }
}
