import { API } from '../lib/consts.js'

export const deleteAddModel = async ({ addId, token }) => {
  try {
    const query = `${API.ADDS}/${addId}`

    const response = await fetch(query, {
      method: 'DELETE',
      headers: {
        "Authorization": `${token}`
      }
    })
    if (!response.ok) {
      const { error } = await response.json()
      throw new Error(error)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}