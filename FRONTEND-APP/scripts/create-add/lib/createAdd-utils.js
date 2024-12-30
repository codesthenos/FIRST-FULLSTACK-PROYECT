import { API, errorNoti, REGEXP, SUCCESS_MESSAGES, successNoti } from '../../lib/consts.js'
import { fireNotificationEvent } from '../../lib/fire-notification-event.js'
import { createAddModel } from '../createAdd-model.js'
import { CREATE_ADD_VALUES } from './consts.js'

export const takeCreateAddInputsValue = ({ tagsContainer }) => {
  const addNameInput = document.getElementById(CREATE_ADD_VALUES.NAME) 
  const addPriceInput = document.getElementById(CREATE_ADD_VALUES.PRICE) 
  const addDescriptionInput = document.getElementById(CREATE_ADD_VALUES.DESCRIPTION) 
  const addForInput = document.querySelector(CREATE_ADD_VALUES.FOR)
  const addImageInput = document.getElementById(CREATE_ADD_VALUES.IMAGE)

  const dinamicTagsInputs = tagsContainer.querySelectorAll('input:checked')

  const addNameValue = addNameInput.value 
  const addPriceValue = addPriceInput.value
  const addDescriptionValue = addDescriptionInput.value
  const addForValue = addForInput.value
  const addImageValue = addImageInput.value

  const addTagsValue = []

  dinamicTagsInputs.forEach(tagInput => {
    addTagsValue.push(tagInput.name.toLowerCase())
  })

  return { addNameValue, addPriceValue, addDescriptionValue, addForValue, addImageValue, addTagsValue }
}

export const validateCreateAdd = ({ addNameValue, addDescriptionValue, addImageValue }) => {
  const errors = []

  if (addNameValue.trim().length < 4) {
    errors.push('Name cannot be just spaces')
  }

  if (addDescriptionValue.trim().length === 0) {
    errors.push('Description cannot be only spaces')
  }

  if (addImageValue) {
    const imageRegExp = new RegExp(REGEXP.image, 'i')
  
    if (!imageRegExp.test(addImageValue)) {
      errors.push('Image has to start with "https://" and end with ".jpg" or other image extension')
    }
  }
  
  return errors
}


export const handleCreateAdd = async ({ element, addName, addPrice, addDescription, addFor, addImage, addTags, token }) => {
  try {
    await createAddModel({ addName, addPrice, addDescription, addFor, addImage, addTags, token, endpoint: API.ADDS })

    fireNotificationEvent({ element, type: successNoti, message: SUCCESS_MESSAGES.CREATED_ADD })

    // No needed since i quitted the sessionStorage usage from '/' sessionStorage.clear()

    setTimeout(() => {
      window.location.href = '/'
    }, 750)
  } catch (error) {
    fireNotificationEvent({ element, type: errorNoti, errorList: [error.message] })
  }
}