import { buttonClassName } from '../../lib/consts.js'

export const clearFiltersButtonView = () => {
  const clearFilterAnchor = document.createElement('a')

  clearFilterAnchor.setAttribute('href', '/')
  clearFilterAnchor.classList.add(buttonClassName)
  clearFilterAnchor.setAttribute('id', 'clear-filters-button')
  clearFilterAnchor.textContent = 'CLEAR FILTERS'

  return clearFilterAnchor
}