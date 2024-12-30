import { errorClassName, errorNoti, loadingNoti, notiDiv, successClassName, successNoti } from '../lib/consts.js'
import { setNotification } from '../lib/setNotification.js'
import { errorNotificationView, notificationView } from './notification-view.js'

export const notificationsController = ({ element }) => {
  const showNotifications = ({ errorList, message, type }) => {
    if (type === errorNoti) {
      const errorUl = errorNotificationView({ errorList, notificationClassName: errorClassName })

      setNotification({
        notification: element,
        removeClassName1: loadingNoti,
        removeClassName2: successNoti,
        addClassName: errorNoti
      })

      element.appendChild(errorUl)
      setTimeout(() => {
        element.innerHTML = ''
        element.classList.remove(errorNoti)
        element.classList.remove('notifications-div')
      }, 5000)
    } else if (type === loadingNoti) {
      setNotification({
        notification: element,
        removeClassName1: errorNoti,
        removeClassName2: successNoti,
        addClassName: loadingNoti
      })
    } else if (type === successNoti) {
      const successH2 = notificationView({ notificationMessage: message, notificationClassName: successClassName })

      setNotification({
        notification: element,
        removeClassName1: loadingNoti,
        removeClassName2: errorNoti,
        addClassName: successNoti
      })

      element.appendChild(successH2)
    }
  }

  return { showNotifications }
}