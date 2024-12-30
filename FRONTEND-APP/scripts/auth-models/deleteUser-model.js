import { API } from '../lib/consts.js'

export const deleteUserModel = async ({ userId, token }) => {
  try {
    const query = `${API.USERS}/${userId}`

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