import { nextPageButtonId, nextPageButtonText } from '../../lib/consts.js'
import { buttonClassName, disabledClassName } from '../../../lib/consts.js'

export const createNextPageButton = ({ isLastPage }) => {
  const nextPageButton = document.createElement('button')
  nextPageButton.setAttribute('id', nextPageButtonId)
  nextPageButton.classList.add(buttonClassName)
  nextPageButton.textContent = nextPageButtonText
  if (isLastPage) {
    nextPageButton.setAttribute('disabled', true)
    nextPageButton.classList.add(disabledClassName)
  }
  return nextPageButton
}