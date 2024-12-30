import { divDescriptionClassName, pFor } from './consts.js'

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

export const addLiHTML = add => {

  return `
  <h4>${add.user.username}</h4>
  <img src="${add.image ? add.image : '/public/placeholder.jpg'}" alt="${add.image ? add.name : 'placeholder'}" />
  <h3>${add.name}</h3>
  <p class="${divDescriptionClassName}">${add.description}</p>
  <p><span>Price:</span> ${add.price}€</p>
  <p class="${pFor}">${add.for.toUpperCase()}</p>
  ${add.tags ? addTags(add.tags) : ''}
  `
}
