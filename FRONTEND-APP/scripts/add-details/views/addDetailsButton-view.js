import { buttonClassName } from '../../lib/consts.js'

export const addDetailButtonView = ({ buttonId, buttonText, buttonHref, add }) => {
  const addButton = buttonHref ? document.createElement('a') : document.createElement('button')
  addButton.setAttribute('id', buttonId)
  addButton.classList.add(buttonClassName)
  addButton.textContent = buttonText
  if (buttonHref) {
    const addButtonHref = `${buttonHref}${add.id}`
    addButton.setAttribute('href', addButtonHref)
  }

  return addButton
}