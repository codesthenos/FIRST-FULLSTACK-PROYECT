import { notiDiv, notificationEventName } from './lib/consts.js'
import { removeLoadingClassNames } from './lib/removeLoadingClassNames.js'
import { isUserLogged } from './lib/auth-utils.js'
import { paginateButtonText } from './index/lib/consts.js'
import { sessionNavController } from './sessionNav/sessionNav-controller.js'
import { notificationsController } from './notifications/notifications-controller.js'
import { indexController } from './index/index-controller.js'

document.addEventListener('DOMContentLoaded', () => {
  const indexMain = document.querySelector('main')
  const notificationsDiv = document.getElementById(notiDiv)

  const { setSessionNav } = sessionNavController({ element: indexMain })

  if (isUserLogged()) {
    setSessionNav({
      deleteUserButtonClass: 'shown',
      homeButtonClass: '_',
      createAddButtonClass: 'shown',
      registerButtonClass: '_',
      loginButtonClass: '_',
      logoutButtonClass: 'shown'
    })
  } else {
    setSessionNav({
      deleteUserButtonClass: '_',
      homeButtonClass: '_',
      createAddButtonClass: '_',
      registerButtonClass: 'shown',
      loginButtonClass: 'shown',
      logoutButtonClass: '_'
    })
  }

  removeLoadingClassNames({ element: notificationsDiv })

  const initialState = {
    queryParams: {
      pageValue: null,
      limitValue: null,
      likeKey: null,
      likeValue: null,
      gteValue: null,
      lteValue: null
    },
    paginationParams: {
      pagButtonText: paginateButtonText
    }
  }
  
  const { showNotifications } = notificationsController({ element: notificationsDiv })
  
  indexMain.addEventListener(notificationEventName, event => {
    showNotifications({ errorList: event.detail.errorList, message: event.detail.message, type: event.detail.type })
  })
  // pass to the index the notification element remove the loading classNames
  indexController({ element: indexMain, notificationElement: notificationsDiv, state: initialState })

})
