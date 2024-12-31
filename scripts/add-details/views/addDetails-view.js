import { buttonDescDivClassName } from '../lib/consts.js'
import { addDetailCardView } from './addDetailsCard-view.js'
import { addDetailButtonsDiv, offerDemandButtonDiv } from './addDetailsButtonsDiv-view.js'
import { addDetailDescView } from './addDetailsDesc-view.js'

export const authAddDetailsView = ({ add }) => {
  const addArticle = document.createElement('article')
  const buttonsDescDiv = document.createElement('div')

  const addDiv = addDetailCardView(add)
  const addButtonsDiv = addDetailButtonsDiv(add)
  const descriptionDiv = addDetailDescView(add)

  buttonsDescDiv.appendChild(addButtonsDiv)
  buttonsDescDiv.appendChild(descriptionDiv)
  buttonsDescDiv.classList.add(buttonDescDivClassName)

  addArticle.appendChild(addDiv)
  addArticle.appendChild(buttonsDescDiv)

  return addArticle
}

export const publicAddDetailView = ({ add }) => {
  const addArticle = document.createElement('article')
  const buttonsDescDiv = document.createElement('div')

  const addDiv = addDetailCardView(add)
  const offerDemandButtonsDiv = offerDemandButtonDiv(add)
  const descriptionDiv = addDetailDescView(add)

  buttonsDescDiv.appendChild(offerDemandButtonsDiv)
  buttonsDescDiv.appendChild(descriptionDiv)
  buttonsDescDiv.classList.add(buttonDescDivClassName)

  addArticle.appendChild(addDiv)
  addArticle.appendChild(buttonsDescDiv)

  return addArticle
}