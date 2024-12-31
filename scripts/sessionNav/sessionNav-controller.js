import { handleDeleteUser } from '../lib/auth-utils.js'
import { SUCCESS_MESSAGES, successNoti } from '../lib/consts.js'
import { fireNotificationEvent } from '../lib/fire-notification-event.js'

export const sessionNavController = ({ element }) => {
  const setSessionNav = ({ deleteUserButtonClass, homeButtonClass, createAddButtonClass, registerButtonClass, loginButtonClass, logoutButtonClass }) => {
    const deleteUserButton = document.getElementById('delete-user-button')
    const homeButton = document.getElementById('home-button')
    const createAddButton = document.getElementById('create-add-button')
    const registerButton = document.getElementById('register-button')
    const loginButton = document.getElementById('login-button')
    const logoutButton = document.getElementById('logout-button')

    deleteUserButton.classList.add(deleteUserButtonClass)
    homeButton.classList.add(homeButtonClass)
    createAddButton.classList.add(createAddButtonClass)
    registerButton.classList.add(registerButtonClass)
    loginButton.classList.add(loginButtonClass)
    logoutButton.classList.add(logoutButtonClass)

    if (logoutButtonClass === 'shown') {
      logoutButton.addEventListener('click', (event) => {
        event.preventDefault()
        localStorage.removeItem('JWT')
        fireNotificationEvent({ element, type: successNoti, message: SUCCESS_MESSAGES.LOGOUT })
        setTimeout(() => {
          window.location.href = '/'
        }, 750)
      })
    }

    if (deleteUserButtonClass === 'shown') {
      deleteUserButton.addEventListener('click', (event) => {
        event.preventDefault()
        const shouldDelete = confirm('DELETING USER INFO, and ALL ADDS, SURE?')

        if (shouldDelete) {
          handleDeleteUser({ element })
        }
      })
    }
  }

  return { setSessionNav }
}