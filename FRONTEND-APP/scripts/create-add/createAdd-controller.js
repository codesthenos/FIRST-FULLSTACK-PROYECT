import { errorNoti, loadingNoti } from '../lib/consts.js'
import { fireNotificationEvent } from '../lib/fire-notification-event.js'
import { removeLoadingClassNames } from '../lib/removeLoadingClassNames.js'
import { customTagDivView } from './customTag-view.js'
import { handleCreateAdd, takeCreateAddInputsValue, validateCreateAdd } from './lib/createAdd-utils.js'

export const createAddController = ({ element, customTag }) => {
  const notificationElement = document.getElementById('notifications-div')
  const tagsContainer = document.getElementById('tags-div-id')

  if (customTag) {
    const newTag = customTagDivView({ tagValue: customTag })
  
    if (newTag) {
      tagsContainer.appendChild(newTag)
    }
  }

  const createAddForm = document.getElementById('create-add-form')
  if (!createAddForm.hasSubmitListener) {
    createAddForm.addEventListener('submit', (event) => {
      event.preventDefault()
  
      fireNotificationEvent({ element, type: loadingNoti })
  
      const {
        addNameValue,
        addPriceValue,
        addDescriptionValue,
        addForValue,
        addImageValue,
        addTagsValue,
        addImageFile
      } = takeCreateAddInputsValue({ tagsContainer })
  
      const errors = validateCreateAdd({ addNameValue, addDescriptionValue, addImageValue })
  
      if (errors.length > 0) {
        fireNotificationEvent({ element, type: errorNoti, errorList: errors })
      } else {
        const token = localStorage.getItem('JWT')
        if (!token) {
          fireNotificationEvent({ element, type: errorNoti, errorList: ['PLEASE LOG IN'] })
          setTimeout(() => {
            window.location.href = '../index.html'
          }, 1500)
        }
        handleCreateAdd({
          element,
          addName: addNameValue,
          addPrice: addPriceValue,
          addDescription: addDescriptionValue,
          addFor: addForValue,
          addTags: addTagsValue,
          addImageFile,
          token
        })
      }
    })

    createAddForm.hasSubmitListener = true
  }
  const addCustomTagButton = document.getElementById('add-custom-tag-button')
  if (!addCustomTagButton.hasClickListener) {
    addCustomTagButton.addEventListener('click', () => {
      fireNotificationEvent({ element, type: loadingNoti })
  
      const customTagInput = document.getElementById('custom-tag-input')
      const customTagValue = customTagInput.value.toLowerCase().trim()

      const tagRegexp = /^\s*\S.*$/
  
      if (!tagRegexp.test(customTagValue)) {
        fireNotificationEvent({ element, type: errorNoti, errorList: ['PLEASE FILL THE TAG'] })
      } else {
        try {
          const customTagAlreadyExists = tagsContainer.querySelector(`#${customTagValue.replace(/\s+/g, '-')}-div-id`)
          if (customTagAlreadyExists) {
            fireNotificationEvent({ element, type: errorNoti, errorList: ['TAG ALREADY EXISTS'] })
          } else {
            customTagInput.value = ''
            removeLoadingClassNames({ element: notificationElement })
        
            createAddController({ element, customTag: customTagValue })
          }
        } catch (error) {
          fireNotificationEvent({ element, type: errorNoti, errorList: ['NO SPECIAL CHARS IN TAG, PLEASE'] })
        }
      }
    })

    addCustomTagButton.hasClickListener = true
  }
}