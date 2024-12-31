import { isUserLogged } from './lib/auth-utils.js'
import { errorNoti, notiDiv, notificationEventName } from './lib/consts.js'
import { fireNotificationEvent } from './lib/fire-notification-event.js'
import { removeLoadingClassNames } from './lib/removeLoadingClassNames.js'
import { notificationsController } from './notifications/notifications-controller.js'
import { sessionNavController } from './sessionNav/sessionNav-controller.js'
import { updateAddController } from './update-add/updateAdd-controller.js'

document.addEventListener('DOMContentLoaded', () => {
  const searchParams = new URLSearchParams(window.location.search)
  const addId = searchParams.get('id')

  const updateAddMain = document.querySelector('main')
  const notificationsDiv = document.getElementById(notiDiv)

  const { showNotifications } = notificationsController({ element: notificationsDiv })

  const { setSessionNav } = sessionNavController({ element: updateAddMain })

  updateAddMain.addEventListener(notificationEventName, (event) => {
    showNotifications({ errorList: event.detail.errorList, message: event.detail.message, type: event.detail.type })
  })

  if (!isUserLogged()) {
    setSessionNav({
      homeButtonClass: 'shown',
      createAddButtonClass: '_',
      registerButtonClass: 'shown',
      loginButtonClass: 'shown',
      logoutButtonClass: '_'
    })
    updateAddMain.innerHTML = ''
    fireNotificationEvent({ element: updateAddMain, type: errorNoti, errorList: ['UNATHORIZED, please login'] })
    setTimeout(() => {
      window.location.href = '/routes/login.html'
    }, 1500)
  } else {
    setSessionNav({
      homeButtonClass: 'shown',
      createAddButtonClass: 'shown',
      registerButtonClass: '_',
      loginButtonClass: '_',
      logoutButtonClass: 'shown'
    })
    removeLoadingClassNames({ element: notificationsDiv })
    
    updateAddController({ element: updateAddMain, addId })
  }

})