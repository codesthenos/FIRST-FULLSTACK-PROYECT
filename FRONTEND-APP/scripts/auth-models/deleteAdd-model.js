import { API } from '../lib/consts.js'

export const deleteAddModel = async ({ addId, token }) => {
  try {
    const query = `${API.ADD}/${addId}`

    const response = await fetch(query, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}