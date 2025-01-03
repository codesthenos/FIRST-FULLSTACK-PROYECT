import { API } from '../lib/consts.js'

export const deleteUserModel = async ({ userId, token }) => {
  try {
    const query = `${API.USER}/${userId}`

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