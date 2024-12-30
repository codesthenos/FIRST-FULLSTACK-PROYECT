import { addDetailsModel } from '../add-details/addDetails-model.js'
import { customTagDivView } from '../create-add/customTag-view.js'
import { takeCreateAddInputsValue, validateCreateAdd } from '../create-add/lib/createAdd-utils.js'
import { isUserLoggedOwner } from '../lib/auth-utils.js'
import { errorNoti, loadingNoti } from '../lib/consts.js'
import { fireNotificationEvent } from '../lib/fire-notification-event.js'
import { removeLoadingClassNames } from '../lib/removeLoadingClassNames.js'
import { handleUpdateAdd, setUpdateAddInputValues } from './utils.js'

export const updateAddController = async ({ element, addId, customTag }) => {
  if (!addId) {
    element.innerHTML = ''
    fireNotificationEvent({ element, type: errorNoti, errorList: ['No id provided'] })
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  }

  try {
    const response = await addDetailsModel({ addId })
    const add = response.add

    if (!await isUserLoggedOwner({ element, add })) {
      element.innerHTML = ''
      fireNotificationEvent({ element, type: errorNoti, errorList: ['UNAUTHORIZED user logged is not the owner'] })
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    } else {
      const notificationElement = document.getElementById('notifications-div')
      const tagsContainer = document.getElementById('tags-div-id')
      
      const staticTags = ['electronics', 'sports', 'motor']

      const dinamicTagsInputs = add.tags ? add.tags.filter(tag => !staticTags.includes(tag)) : []

      if (customTag) {
        const newTag = customTagDivView({ tagValue: customTag })

        if (newTag) {
          tagsContainer.appendChild(newTag)
        }
      } else {
          dinamicTagsInputs.forEach(customTag => {
            const customTagDiv = customTagDivView({ tagValue: customTag })
            tagsContainer.appendChild(customTagDiv)
          })
      }

      setUpdateAddInputValues({
        addName: add.name,
        addPrice: add.price,
        addImage: add.image,
        addDescription: add.description,
        addFor: add.for,
        addTags: add.tags ? add.tags : [],
        tagsContainer
      })

      const updateAddForm = document.getElementById('update-add-form')
      if (!updateAddForm.hasSubmitListener) {
        updateAddForm.addEventListener('submit', (event) => {
          event.preventDefault()
  
          fireNotificationEvent({ element, type: loadingNoti })
  
          const {
            addNameValue,
            addPriceValue,
            addDescriptionValue,
            addForValue,
            addImageValue,
            addTagsValue
          } = takeCreateAddInputsValue({ tagsContainer })
  
          const errors = validateCreateAdd({
            addNameValue,
            addDescriptionValue,
            addImageValue
          })
  
          if (errors.length > 0) {
            fireNotificationEvent({ element, type: errorNoti, errorList: errors })
          } else {
            handleUpdateAdd({
              element,
              add,
              addNameValue,
              addPriceValue,
              addDescriptionValue,
              addForValue,
              addImageValue,
              addTagsValue
            })
          }
        })

        updateAddForm.hasSubmitListener = true
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
            const customTagAlreadyExists = tagsContainer.querySelector(`#${customTagValue.replace(/\s+/g, '-')}-div-id`)
            if (customTagAlreadyExists) {
              fireNotificationEvent({ element, type: errorNoti, errorList: ['TAG ALREADY EXISTS'] })
            } else {
              customTagInput.value = ''
              removeLoadingClassNames({ element: notificationElement })
          
              updateAddController({ element, addId, customTag: customTagValue })
            }
          }
        })
        addCustomTagButton.hasClickListener = true
      }
    }
  } catch (error) {
    fireNotificationEvent({ element, type: errorNoti, errorList: [error.message]})
  }
}
