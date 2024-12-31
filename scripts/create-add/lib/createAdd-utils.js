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
  const addImageFile = addImageInput.files[0]

  const addTagsValue = []

  dinamicTagsInputs.forEach(tagInput => {
    addTagsValue.push(tagInput.name.toLowerCase())
  })

  return { addNameValue, addPriceValue, addDescriptionValue, addForValue, addImageValue, addTagsValue, addImageFile }
}

export const validateCreateAdd = ({ addNameValue, addDescriptionValue, addImageValue }) => {
  const errors = []

  if (addNameValue.trim().length < 3) {
    errors.push('Name cannot be just spaces')
  }

  if (addDescriptionValue.trim().length === 0) {
    errors.push('Description cannot be only spaces')
  }

  if (addImageValue) {
    const imageRegExp = new RegExp(REGEXP.image, 'i')
  
    if (!imageRegExp.test(addImageValue)) {
      errors.push('Image has to end with ".jpg" | "jpeg" | "png" | "webp" | "gif"')
    }
  }
  
  return errors
}


export const handleCreateAdd = async ({ element, addName, addPrice, addDescription, addFor, addTags, token, addImageFile }) => {
  try {
    await createAddModel({ addName, addPrice, addDescription, addFor, addTags, token, endpoint: API.ADDS, addImageFile })

    fireNotificationEvent({ element, type: successNoti, message: SUCCESS_MESSAGES.CREATED_ADD })

    // No needed since i quitted the sessionStorage usage from '/' sessionStorage.clear()

    setTimeout(() => {
      window.location.href = '../index.html'
    }, 750)
  } catch (error) {
    fireNotificationEvent({ element, type: errorNoti, errorList: [error.message] })
  }
}