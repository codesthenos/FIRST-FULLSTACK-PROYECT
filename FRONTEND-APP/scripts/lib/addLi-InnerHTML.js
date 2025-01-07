import { divDescriptionClassName, HOST, pFor } from './consts.js'

const addTags = addTags => {
  const tags = []

  addTags.forEach(tag => {
    tags.push(tag.replace(/-/g, ' '))
  })

  if (addTags.length === 0) {
    return '<p>No tags</p>'
  } else {
    return `<p>${tags.join(', ')}</p>`
  }
}

const escapeHtml = (unsafe) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(unsafe, 'text/html')
  return doc.body.textContent || ''
}

export const addLiHTML = add => {

  return `
  <h4>${add.owner.username}</h4>
  <img src="${HOST}${add.image}" alt="${escapeHtml(add.name)}" />
  <h3>${escapeHtml(add.name)}</h3>
  <p class="${divDescriptionClassName}">${escapeHtml(add.description)}</p>
  <p><span>Price:</span> ${add.price}€</p>
  <p class="${pFor}">${add.for.toUpperCase()}</p>
  ${add.tags ? addTags(add.tags) : ''}
  `
}
