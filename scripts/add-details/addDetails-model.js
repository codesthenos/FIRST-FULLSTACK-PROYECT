import { API } from '../lib/consts.js'
import { noAdd } from './lib/consts.js'

export const addDetailsModel = async ({ addId }) => {
  try {
    const token = localStorage.getItem('JWT')
    const query = `${API.ADDS}/${addId}`
    const response = await fetch(query, {
      headers: {
        "Authorization": `${token}`
      }
    })
    const { add } = await response.json()

    if (add._id !== addId) throw new Error(noAdd)

    return { add }
  } catch (error) {
    throw new Error(error.message)
  }
}