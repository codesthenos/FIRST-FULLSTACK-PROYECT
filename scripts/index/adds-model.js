import { API } from '../lib/consts.js'
import { noAddsMessage } from './lib/consts.js'

export const addsModel = async ({ queryParams }) => {
  try {
    const { pageValue, limitValue, likeKey, likeValue, gteValue, lteValue } = queryParams

    let query = API.ADDS
    if ((pageValue || pageValue === 0) && limitValue) {
      query = `${query}?skip=${pageValue}&limit=${limitValue}`
    }

    if (likeValue) {
      const nextQueryChar = query.includes('/adds?') ? '&' : '?'
      query = `${query}${nextQueryChar}${likeKey}=${likeValue}`
    }

    let price = ''
    if (gteValue) price = `${gteValue}-`
    if (lteValue) price += price ? `${lteValue}` : `-${lteValue}`

    if (price) {
      const nextQueryChar = query.includes('/adds?') ? '&' : '?'
      query = `${query}${nextQueryChar}price=${price}`
    }

    const response = await fetch(query)
    
    const { adds, totalAdds } = await response.json()

    if (!adds.length){
      throw new Error(noAddsMessage)
    } else {
      return { adds, totalAdds }
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
