export const customTagDivView = ({ tagValue }) => {
  const customTagDiv = document.createElement('div')
  const customTagInput = document.createElement('input')
  const customTagLabel = document.createElement('label')

  customTagInput.setAttribute('type', 'checkbox')
  customTagInput.setAttribute('id', tagValue.replace(/\s+/g, '-'))
  customTagInput.setAttribute('name', tagValue.replace(/\s+/g, '-'))

  customTagLabel.setAttribute('for', tagValue.replace(/\s+/g, '-'))
  customTagLabel.textContent = tagValue.replace(/-/g, ' ')

  customTagDiv.appendChild(customTagInput)
  customTagDiv.appendChild(customTagLabel)
  customTagDiv.classList.add('tag-div')
  customTagDiv.setAttribute('id', `${tagValue.replace(/\s+/g, '-')}-div-id`)

  return customTagDiv
}