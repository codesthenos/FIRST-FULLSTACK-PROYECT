import { addDetailsModel } from './addDetails-model.js'
import { authAddDetailsView, publicAddDetailView } from './views/addDetails-view.js'
import { fireNotificationEvent } from '../lib/fire-notification-event.js'
import { errorNoti, loadingNoti } from '../lib/consts.js'
import { removeLoadingClassNames } from '../lib/removeLoadingClassNames.js'
import { handleDeleteAdd, isUserLogged, isUserLoggedOwner } from '../lib/auth-utils.js'
import { deleteAddButtonId } from './lib/consts.js'

export const addDetailsController = async ({ element, notificationElement, addId }) => {
  if (!addId) {
    fireNotificationEvent({ element, type: errorNoti, errorList: ['No id provided'] })
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  }

  fireNotificationEvent({ element, type: loadingNoti })

  try {
    const response = await addDetailsModel({ addId })
    const add = response.add

    if (!await isUserLoggedOwner({ element, add })) {
      const publicAddDetailDiv = publicAddDetailView({ add })
      element.innerHTML = ''
      element.appendChild(publicAddDetailDiv)

      const offerDemandButton = document.getElementById('offer-demand-button')

      offerDemandButton.addEventListener('click', () => {
        if (!isUserLogged()) {
          fireNotificationEvent({ element, type: errorNoti, errorList: ['UNATHORIZED, please login'] })
          setTimeout(() => {
            window.location.href = '/routes/login.html'
          }, 1500)
        } else {
          fireNotificationEvent({ element, type: errorNoti, errorList: ['Service NOT AVIABLE yet'] })
        }
      })
    } else {
      const authAddDetailDiv = authAddDetailsView({ add })

      element.innerHTML = ''
      element.appendChild(authAddDetailDiv)

      const deleteAddButton = document.getElementById(deleteAddButtonId)

      deleteAddButton.addEventListener('click', () => {
        const shouldRemove = confirm('Are you sure about DELETING the add PERMANENTLY?')
        
        if (shouldRemove) {
          handleDeleteAdd({ element, add })
        }
      })
    }

    removeLoadingClassNames({ element: notificationElement })
  } catch (error) {
    fireNotificationEvent({ element, type: errorNoti, errorList: [error.message]})
    setTimeout(() => {
      window.location.href = '/'
    }, 1500)
  }
}