import { errorNoti, notiDiv, notificationEventName } from './lib/consts.js'
import { removeLoadingClassNames } from './lib/removeLoadingClassNames.js'
import { isUserLogged } from './lib/auth-utils.js'
import { notificationsController } from './notifications/notifications-controller.js'
import { sessionNavController } from './sessionNav/sessionNav-controller.js'
import { createAddController } from './create-add/createAdd-controller.js'
import { fireNotificationEvent } from './lib/fire-notification-event.js'

document.addEventListener('DOMContentLoaded', () => {
  const createAddMain = document.querySelector('main')
  const notificationsDiv = document.getElementById(notiDiv)

  const { showNotifications } = notificationsController({ element: notificationsDiv })

  const { setSessionNav } = sessionNavController({ element: createAddMain })

  createAddMain.addEventListener(notificationEventName, (event) => {
    showNotifications({ errorList: event.detail.errorList, message: event.detail.message, type: event.detail.type })
  })

  if (!isUserLogged()) {
    setSessionNav({
      deleteUserButtonClass: '_',
      homeButtonClass: 'shown',
      createAddButtonClass: '_',
      registerButtonClass: 'shown',
      loginButtonClass: 'shown',
      logoutButtonClass: '_'
    })
    createAddMain.innerHTML = ''
    fireNotificationEvent({ element: createAddMain, type: errorNoti, errorList: ['UNATHORIZED, please login']})
    setTimeout(() => {
      window.location.href = '/'
    }, 1500)
  } else {
    setSessionNav({
      deleteUserButtonClass: '_',
      homeButtonClass: 'shown',
      createAddButtonClass: '_',
      registerButtonClass: '_',
      loginButtonClass: '_',
      logoutButtonClass: 'shown'
    })
    removeLoadingClassNames({ element: notificationsDiv })
  }

  createAddController({ element: createAddMain })
})