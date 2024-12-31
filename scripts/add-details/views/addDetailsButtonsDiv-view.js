import { deleteAddButtonId, deleteAddButtonText, updateAddButtonId, updateAddButtonText, buttonsDivClassName, addUpdateButtonHref } from '../lib/consts.js'
import { addDetailButtonView } from './addDetailsButton-view.js'

export const addDetailButtonsDiv = add => {
  const addButtonsDiv = document.createElement('div')
  const updateButton = addDetailButtonView({ buttonId: updateAddButtonId, buttonText: updateAddButtonText, buttonHref: addUpdateButtonHref, add })
  const deleteButton = addDetailButtonView({ buttonId: deleteAddButtonId, buttonText: deleteAddButtonText })
  addButtonsDiv.appendChild(updateButton)
  addButtonsDiv.appendChild(deleteButton)
  addButtonsDiv.classList.add(buttonsDivClassName)

  return addButtonsDiv
}

export const offerDemandButtonDiv = add => {
  const offerDemandButtonsDiv = document.createElement('div')
  const offerDemandButton = addDetailButtonView({
    buttonId: 'offer-demand-button',
    buttonText: `${add.for === 'demand' ? 'OFFER' : 'DEMAND' }`,
  })

  offerDemandButtonsDiv.appendChild(offerDemandButton)
  offerDemandButtonsDiv.classList.add(buttonsDivClassName)

  return offerDemandButtonsDiv
}