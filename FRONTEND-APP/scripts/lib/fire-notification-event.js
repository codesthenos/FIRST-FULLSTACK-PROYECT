import { notificationEventName } from './consts.js'

export const fireNotificationEvent = ({ element, type, message, errorList }) => {
  const notificationEvent = new CustomEvent(notificationEventName, {
    detail: {
      errorList,
      message,
      type
    }
  })
  element.dispatchEvent(notificationEvent)
}