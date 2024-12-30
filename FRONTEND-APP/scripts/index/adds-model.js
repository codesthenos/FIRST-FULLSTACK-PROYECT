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
      const nextQueryChar = query.endsWith('?') ? '&' : '?'
      query = `${query}${nextQueryChar}${likeKey}=${likeValue}`
    }

    if (gteValue) {
      const nextQueryChar = query.endsWith('?') ? '&' : '?'
      query = `${query}${nextQueryChar}price_gte=${gteValue}`
    }

    if (lteValue) {
      const nextQueryChar = query.endsWith('?') ? '&' : '?'
      query = `${query}${nextQueryChar}price_lte=${lteValue}`
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
