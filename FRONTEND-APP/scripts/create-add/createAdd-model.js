export const createAddModel = async ({ addName, addPrice, addDescription, addFor, addTags, token, endpoint, addImageFile }) => {
  try {
    const formData = new FormData()

    formData.append('name', addName)
    formData.append('price', addPrice)
    formData.append('description', addDescription)
    formData.append('for', addFor)
    formData.append('tags', addTags)

    if (addImageFile) {
      formData.append('image', addImageFile)
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        "Authorization": `${token}`
      }
    })
    if (!response.ok) {
      throw new Error('Error creating add')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}