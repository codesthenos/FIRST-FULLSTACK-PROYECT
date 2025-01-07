const escapeHtml = (unsafe) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(unsafe, 'text/html')
  return doc.body.textContent || ''
}

export const descriptionPHTML = add => {
  return `
  <h3>DESCRIPTION</h3>
  <p>${escapeHtml(add.description)}</p>
  `
}