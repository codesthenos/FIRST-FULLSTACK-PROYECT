export const notificationView = ({ notificationMessage, notificationClassName }) => {
  const notificationH2 = document.createElement('h2')
  notificationH2.textContent = notificationMessage
  notificationH2.classList.add(notificationClassName)
  return notificationH2
}

export const errorNotificationView = ({ errorList, notificationClassName }) => {
  const errorUL = document.createElement('ul')
  errorList.forEach(error => {
    const errorH2 = notificationView({ notificationMessage: error, notificationClassName })
    errorUL.appendChild(errorH2)
  })
  return errorUL
}