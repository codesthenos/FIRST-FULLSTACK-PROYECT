import { buttonClassName } from '../../lib/consts.js'

export const filterFormView = ({ id, name }) => {
  const filterForm = document.createElement('form')

  const label = document.createElement('label')
  const input = document.createElement('input')
  const submitButton = document.createElement('button')

  input.setAttribute('type', 'text')
  input.setAttribute('id', id)
  input.setAttribute('name', name)
  input.setAttribute('required', true)

  label.setAttribute('for', id)
  label.textContent = name.toUpperCase()

  submitButton.setAttribute('type', 'submit')
  submitButton.setAttribute('id', `${id}-filter-button`)
  submitButton.classList.add(buttonClassName)
  submitButton.textContent = 'SEARCH'

  filterForm.setAttribute('id', `${id}-filter-form`)
  filterForm.appendChild(input)
  filterForm.appendChild(label)
  filterForm.appendChild(submitButton)

  return filterForm
}