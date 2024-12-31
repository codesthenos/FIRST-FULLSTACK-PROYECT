import { buttonClassName } from '../../lib/consts.js'

export const tagsCheckBoxesFormView = ({ uniqueTags }) => {
  const tagsCheckBoxesForm = document.createElement('form')
  tagsCheckBoxesForm.classList.add('tags-container')
  tagsCheckBoxesForm.setAttribute('id', 'tags-checkbox-form')

  uniqueTags.forEach(tag => {
    const tagDiv = document.createElement('div')

    tagDiv.classList.add('tag-div')

    tagDiv.innerHTML = `
    <input type="checkbox" id="${tag}" name="${tag}" />
    <label for="${tag}">${tag.replace(/-/g, ' ')}</input>
    `

    tagsCheckBoxesForm.appendChild(tagDiv)
  })

  const submitButton = document.createElement('button')

  submitButton.setAttribute('type', 'submit')
  submitButton.setAttribute('id', 'tags-checkbox-filter-button')
  submitButton.classList.add(buttonClassName)
  submitButton.textContent = 'SEARCH'

  tagsCheckBoxesForm.appendChild(submitButton)

  return tagsCheckBoxesForm
}