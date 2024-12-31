import { notiDiv, notificationEventName } from './lib/consts.js'
import { removeLoadingClassNames } from './lib/removeLoadingClassNames.js'
import { isUserLogged } from './lib/auth-utils.js'
import { sessionNavController } from './sessionNav/sessionNav-controller.js'
import { notificationsController } from './notifications/notifications-controller.js'
import { addDetailsController } from './add-details/addDetails-controller.js'

document.addEventListener('DOMContentLoaded', () => {
  const searchParams = new URLSearchParams(window.location.search)
  const addId = searchParams.get('id')

  const addDetailsMain = document.querySelector('main')
  const notificationsDiv = document.getElementById(notiDiv)

  const { setSessionNav } = sessionNavController({ element: addDetailsMain })

  if (isUserLogged()) {
    setSessionNav({
      deleteUserButtonClass: '_',
      homeButtonClass: 'shown',
      createAddButtonClass: 'shown',
      registerButtonClass: '_',
      loginButtonClass: '_',
      logoutButtonClass: 'shown'
    })
  } else {
    setSessionNav({
      deleteUserButtonClass: '_',
      homeButtonClass: 'shown',
      createAddButtonClass: '_',
      registerButtonClass: 'shown',
      loginButtonClass: 'shown',
      logoutButtonClass: '_'
    })
  }

  removeLoadingClassNames({ element: notificationsDiv })

  const { showNotifications } = notificationsController({ element: notificationsDiv })

  addDetailsMain.addEventListener(notificationEventName, event => {
    showNotifications({ errorList: event.detail.errorList, message: event.detail.message, type: event.detail.type })
  })

  addDetailsController({ element: addDetailsMain, notificationElement: notificationsDiv, addId })
})