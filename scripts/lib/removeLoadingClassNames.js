import { loadingNoti } from './consts.js'

export const removeLoadingClassNames = ({ element }) => {
  element.classList.remove(loadingNoti)
  element.classList.remove('notifications-div')
}