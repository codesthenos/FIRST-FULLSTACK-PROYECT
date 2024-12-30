import { addLiClassName } from '../../lib/consts.js'
import { addLiHTML } from '../../lib/addLi-InnerHTML.js'

export const addIntoAnchorHTML = add => {
  const addHTML = `
    <a href="/routes/add-details.html?id=${add.id}">
      <li class="${addLiClassName}">
        ${addLiHTML(add)}
      </li>
    </a>
    `
    return addHTML
}