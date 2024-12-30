import { buttonClassName } from '../../lib/consts.js'

export const priceFilterFormView = () => {
  const priceFilterForm = document.createElement('form')
  
  priceFilterForm.setAttribute('id', 'price-filter-form')

  priceFilterForm.innerHTML = `
  <input id="min-price" type="number" name="min-price" min="0" step="0.01" />
  <label for="min-price">MIN</label>

  <input id="max-price" type="number" name="max-price" min="0" step="0.01" />
  <label for="max-price">MAX</label>
  `

  const submitButton = document.createElement('button')
  
  submitButton.setAttribute('type', 'submit')
  submitButton.setAttribute('id', 'price-filter-button')
  submitButton.classList.add(buttonClassName)
  submitButton.textContent = 'SEARCH'

  priceFilterForm.appendChild(submitButton)
  
  return priceFilterForm
}
