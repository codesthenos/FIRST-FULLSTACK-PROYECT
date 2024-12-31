import { CREATE_ADD_VALUES } from '../create-add/lib/consts.js'
import { errorNoti, HOST, loadingNoti, SUCCESS_MESSAGES, successNoti } from '../lib/consts.js'
import { fireNotificationEvent } from '../lib/fire-notification-event.js'
import { updateAddModel } from './updateAdd-model.js'

export const setUpdateAddInputValues = ({
  addName,
  addPrice,
  addImage,
  addDescription,
  addFor,
  addTags,
  tagsContainer
}) => {
  const addNameInput = document.getElementById(CREATE_ADD_VALUES.NAME)
  const addPriceInput = document.getElementById(CREATE_ADD_VALUES.PRICE)
  const addDescriptionInput = document.getElementById(CREATE_ADD_VALUES.DESCRIPTION)
  const addOfferInput = document.getElementById('offer')
  const addDemandInput = document.getElementById('demand')

  const currentImageDiv = document.getElementById('current-image')
  currentImageDiv.innerHTML = `
  <h3>Current image</h3>
  <img src="${HOST}${addImage}" alt="${addName}" />
  `

  const dinamicTagsInputs = tagsContainer.querySelectorAll('input')
  
  addNameInput.value = addName
  addPriceInput.value = addPrice
  addDescriptionInput.value = addDescription

  dinamicTagsInputs.forEach(dinamicTag => {
    if (addTags.some(tag => tag.replace(/\s+/g, '-') === dinamicTag.name)) {
      dinamicTag.checked = true
    }
  })


  if (addFor === 'demand') {
    addDemandInput.checked = true
  } else {
    addOfferInput.checked = true
  }
}

export const handleUpdateAdd = async ({
  element,
  add,
  addNameValue,
  addPriceValue,
  addDescriptionValue,
  addForValue,
  addTagsValue,
  addImageFile
}) => {
  const token = localStorage.getItem('JWT')

  fireNotificationEvent({ element, type: loadingNoti })
  
  if (!token) {
    fireNotificationEvent({ element, type: errorNoti, errorList: ['UNATHORIZED Not user logged'] })
    setTimeout(() => {
      window.location.href = '/routes/login.html'
    }, 1500)
  } else {
    try {
      await updateAddModel({
        add,
        token,
        addNameValue,
        addPriceValue,
        addDescriptionValue,
        addForValue,
        addTagsValue,
        addImageFile
      })
      fireNotificationEvent({ element, type: successNoti, message: SUCCESS_MESSAGES.UPDATED_ADD })
      setTimeout(() => {
        window.location.href = `/routes/add-details.html?id=${add._id}`
      }, 1000)
    } catch (error) {
      fireNotificationEvent({ element, type: errorNoti, errorList: [error.message] })
    }
  }
}