import { previousPageButtonId, previousPageButtonText } from '../../lib/consts.js'
import { buttonClassName, disabledClassName } from '../../../lib/consts.js'

export const createPreviousPageButton = ({ isFirstPage }) => {
  const previousPageButton = document.createElement('button')
  previousPageButton.setAttribute('id', previousPageButtonId)
  previousPageButton.classList.add(buttonClassName)
  previousPageButton.textContent = previousPageButtonText
  if (isFirstPage) {
    previousPageButton.setAttribute('disabled', true)
    previousPageButton.classList.add(disabledClassName)
  }
  return previousPageButton
}