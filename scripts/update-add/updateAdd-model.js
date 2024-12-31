import { API } from '../lib/consts.js'

export const updateAddModel = async ({
  add,
  token,
  addNameValue,
  addPriceValue,
  addDescriptionValue,
  addForValue,
  addTagsValue,
  addImageFile
}) => {
  try {
    const formData = new FormData()

    formData.append('name', addNameValue)
    formData.append('price', addPriceValue)
    formData.append('description', addDescriptionValue)
    formData.append('for', addForValue)
    formData.append('tags', addTagsValue)

    if (addImageFile) {
      formData.append('image', addImageFile)
    }

    const query = `${API.ADDS}/${add._id}`
    const response = await fetch(query, {
      method: 'PUT',
      body: formData,
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