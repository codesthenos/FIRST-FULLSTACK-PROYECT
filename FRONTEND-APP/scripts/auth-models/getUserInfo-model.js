import { API } from '../lib/consts.js'

export const getUserInfo = async ({ token }) => {
  try {
    const response = await fetch(API.USER , {
      headers: {
        "Authorization": `${token}`
      }
    })
    if (!response.ok) {
      throw new Error('Error getting user info')
    } else {
      return await response.json()
    }
  } catch (error) {
    throw new Error(error.message)
  }
}