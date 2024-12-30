import { addLiHTML } from '../../lib/addLi-InnerHTML.js'
import { addLiClassName } from '../../lib/consts.js'

export const addDetailCardView = add => {
  const addDiv = document.createElement('div')
  const addDivHTML = addLiHTML(add)
  addDiv.innerHTML = addDivHTML
  addDiv.classList.add(addLiClassName)

  return addDiv
}