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
const HOST = 'http://localhost:8000'
// Routes
const ROUTES = {
  AUTH: '/auth',
  PUBLIC: '/api'
}
// Query param to get the USER info from an ADD
export const expand = '?_expand=user'
// API endpoints
export const API = {
  ADDS: `${HOST}${ROUTES.PUBLIC}/adds${expand}`,
  ADD: `${HOST}${ROUTES.PUBLIC}/adds`,
  REGISTER: `${HOST}${ROUTES.AUTH}/register`,
  LOGIN: `${HOST}${ROUTES.AUTH}/login`,
  GET_USER_LOGGED_INFO: `${HOST}${ROUTES.AUTH}/me`,
  BACKUP_ADDS: `${HOST}${ROUTES.PUBLIC}/backupAdds`,
  BACKUP_USERS: `${HOST}${ROUTES.PUBLIC}/backupUsers`,
  USERS: `${HOST}${ROUTES.PUBLIC}/users`
}
