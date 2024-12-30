import { handleLogin, takeLoginInputsValue, validateLogin } from '../lib/auth-utils.js'
import { API, errorNoti, loadingNoti } from '../lib/consts.js'
import { fireNotificationEvent } from '../lib/fire-notification-event.js'

export const loginController = ({ element }) => {
  element.addEventListener('submit', (event) => {
    event.preventDefault()

    fireNotificationEvent({ element, type: loadingNoti })

    const { userEmail, userPassword } = takeLoginInputsValue({ emailId: 'email', passId: 'password' })
  
    const errors = validateLogin({ userEmail })

    if (errors.length > 0) {
      fireNotificationEvent({ element, type: errorNoti, errorList: errors })
    } else {
      handleLogin({ element, userEmail, userPassword, endpoint: API.LOGIN })
    }
  })
}