import { divDescriptionClassName } from '../../lib/consts.js'
import { descriptionPHTML } from '../lib/addDescriptionDiv-innerHTML.js'

export const addDetailDescView = add => {
  const descriptionDiv = document.createElement('div')
  const descDivHTML = descriptionPHTML(add)
  descriptionDiv.innerHTML = descDivHTML
  descriptionDiv.classList.add(divDescriptionClassName)

  return descriptionDiv
}