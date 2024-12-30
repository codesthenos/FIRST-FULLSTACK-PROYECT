export const authUser = async ({ userEmail, userPassword, endpoint }) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        username: userEmail,
        password: userPassword
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    } else {
      return await response.json()
    }
  } catch (error) {
    throw new Error(error.message)
  }
}