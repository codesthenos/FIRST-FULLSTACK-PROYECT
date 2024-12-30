import { notiDiv } from './consts.js'

export const setNotification = ({ notification, removeClassName1, removeClassName2, addClassName }) => {
  notification.innerHTML = ''
  notification.classList.remove(removeClassName1)
  notification.classList.remove(removeClassName2)
  notification.classList.add(notiDiv)
  notification.classList.add(addClassName)
}