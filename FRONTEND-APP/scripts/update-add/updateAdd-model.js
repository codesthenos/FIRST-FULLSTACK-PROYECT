import { API } from '../lib/consts.js'

export const updateAddModel = async ({
  add,
  token,
  addNameValue,
  addPriceValue,
  addDescriptionValue,
  addForValue,
  addImageValue,
  addTagsValue
}) => {
  try {
    const query = `${API.ADD}/${add.id}`
    const response = await fetch(query, {
      method: 'PUT',
      body: JSON.stringify({
        name: addNameValue,
        price: +addPriceValue,
        description: addDescriptionValue,
        for: addForValue,
        image: addImageValue,
        tags: addTagsValue
      }),
      headers: {
        "Content-Type": "application/json",
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