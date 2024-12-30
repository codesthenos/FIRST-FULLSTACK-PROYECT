// Loading css classname
export const loadingClassName = 'loading'
// ERROR css className
export const errorClassName = 'error-h2'
// success CSS clas name
export const successClassName = 'success-h2'
// li add CSS class name
export const addLiClassName = 'add-card'
// div description class name
export const divDescriptionClassName = 'description-div'
// p for class name
export const pFor = 'for-p'
// css class button
export const buttonClassName = 'btn'
// disabled css classname
export const disabledClassName = 'disabled'
// notification event name
export const notificationEventName = 'notification'
// notification event detail types
export const errorNoti = 'error'
export const loadingNoti = 'loading'
export const successNoti = 'success'
// success messages
export const SUCCESS_MESSAGES = {
  REGISTERED: 'SUCCESSFULLY REGISTERED',
  LOGGED: 'SUCCESSFULLY LOGGED',
  LOGOUT: 'SUCCESSFULLY LOGGED OUT',
  CREATED_ADD: 'SUCCESSFULLY CREATED ADD',
  DELETED_ADD: 'SUCCESSFULLY DELETED ADD',
  UPDATED_ADD: 'SUCCESSFULLY UPDATED ADD',
  DELETED_USER: 'SUCCESSFULLY DELETED USER'
}
// notifications HTMLElement node
export const notiDiv = 'notifications-div'
// REGEXP
export const REGEXP = {
  email: /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
  image: /^https:\/\/.+\.(jpg|jpeg|png|webp|gif|bmp|svg)$/
}
// Host
export const HOST = 'http://localhost:5555'
// API endpoints
export const API = {
  REGISTER: `${HOST}/register`,
  LOGIN: `${HOST}/login`,
  USER: `${HOST}/user`,
  ADDS: `${HOST}/adds`
}
