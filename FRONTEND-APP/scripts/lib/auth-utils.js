import { API, errorNoti, loadingNoti, REGEXP, SUCCESS_MESSAGES, successNoti } from './consts.js'
import { fireNotificationEvent } from './fire-notification-event.js'
import { authUser } from '../auth-models/authUser-model.js'
import { getUserInfo } from '../auth-models/getUserInfo-model.js'
import { deleteAddModel } from '../auth-models/deleteAdd-model.js'
import { createAddModel } from '../create-add/createAdd-model.js'
import { deleteUserModel } from '../auth-models/deleteUser-model.js'

export const takeLoginInputsValue = ({ emailId, passId }) => {
  const userEmailInput = document.getElementById(emailId)
  const userPasswordInput = document.getElementById(passId)

  const userEmail = userEmailInput.value
  const userPassword = userPasswordInput.value

  return { userEmail, userPassword }
}

export const takeRegisterInputsValue = ({ emailId, passId, passConfirmId }) => {
  const userPasswordConfirmInput = document.getElementById(passConfirmId)
  
  const { userEmail, userPassword } = takeLoginInputsValue({ emailId, passId })

  const userPasswordConfirm = userPasswordConfirmInput.value

  return { userEmail, userPassword, userPasswordConfirm }
}

export const validateLogin = ({ userEmail }) => {
  const errors = []

  const emailRegExp = new RegExp(REGEXP.email, 'i')

  if (!emailRegExp.test(userEmail)) {
    errors.push('Wrong email format')
  }
  return errors
}

export const validateRegister = ({ userEmail, userPassword, userPasswordConfirm }) => {
  const errors = validateLogin({ userEmail })

  if (userPasswordConfirm && userPassword !== userPasswordConfirm) {
    errors.push('Passwords doesn\'t match')
  }
  return errors
}

export const handleLogin = async ({ element, userEmail, userPassword, endpoint }) => {
  try {
    const { accessToken } = await authUser({ userEmail, userPassword, endpoint })

    localStorage.setItem('JWT', accessToken)

    fireNotificationEvent({ element, type: successNoti, message: SUCCESS_MESSAGES.LOGGED })

    setTimeout(() => {
      window.location.href = '/'
    }, 750)
  } catch (error) {
    fireNotificationEvent({ element, type: errorNoti, errorList: [error.message] })
  }
}

export const handleRegister = async ({ element, userEmail, userPassword, endpoint }) => {
  try {
    await authUser({ userEmail, userPassword, endpoint })

    fireNotificationEvent({ element, type: successNoti, message: SUCCESS_MESSAGES.REGISTERED })

    setTimeout(async () => {
      await handleLogin({ element, userEmail, userPassword, endpoint: API.LOGIN })
    }, 750)
  } catch (error) {
    fireNotificationEvent({ element, type: errorNoti, errorList: [error.message] })
  }
}

export const handleDeleteAdd = async ({ element, add }) => {
  const token = localStorage.getItem('JWT')

  fireNotificationEvent({ element, type: loadingNoti })
  
  if (!token) {
    fireNotificationEvent({ element, type: errorNoti, errorList: ['UNATHORIZED Not user logged'] })
    setTimeout(() => {
      window.location.href = '/routes/login.html'
    }, 1500)
  } else {
    try {
      // No se si te va a gustar Edu, pero para seguir jugando y aprendiendo, se me ocurrio que
      // borrar un anuncio, no implicase que perdiesemos la info, aunque se que en la vida real
      // habria que ver el aspecto legal de quedarse con data o avisar al user etc...
      await createAddModel({
        addName: add.name,
        addPrice: add.price,
        addDescription: add.description,
        addFor: add.for,
        addImage: add.image,
        token,
        endpoint: API.BACKUP_ADDS
      })
      await deleteAddModel({ addId: add.id, token })
      fireNotificationEvent({ element, type: successNoti, message: SUCCESS_MESSAGES.DELETED_ADD })
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    } catch (error) {
      fireNotificationEvent({ element, type: errorNoti, errorList: [error.message] })
    }
  }
}

export const handleDeleteUser = async ({ element }) => {
  const token = localStorage.getItem('JWT')

  fireNotificationEvent({ element, type: loadingNoti })

  if (!token) {
    fireNotificationEvent({ element, type: errorNoti, errorList: ['UNATHORIZED Not user logged'] })
    setTimeout(() => {
      window.location.href = '/routes/login.html'
    }, 1500)
  } else {
    try {
      const user = await getUserInfo({ token })
      await deleteUserModel({ userId: user.id, token })
      localStorage.removeItem('JWT')
      fireNotificationEvent({ element, type: successNoti, message: SUCCESS_MESSAGES.DELETED_USER })
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    } catch (error) {
      fireNotificationEvent({ element, type: errorNoti, errorList: [error.message] })
    }
  }
}

export const isUserLogged = () => {
  const token = localStorage.getItem('JWT')

  return !!token
}

export const isUserLoggedOwner = async ({ element, add }) => {
  const token = localStorage.getItem('JWT')

  if (token) {
    try {
      const ownerId = add.user.id
      const user = await getUserInfo({ token })

      return ownerId === user.id
    } catch (error) {
      fireNotificationEvent({ element, type: errorNoti, errorList: [error.message] })
    }
  } else {
    return false
  }
}