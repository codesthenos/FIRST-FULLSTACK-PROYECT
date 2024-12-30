import { addIntoAnchorHTML } from '../lib/addIntoAnchorHTML.js'

export const addsList = ({ adds }) => {
  const addsUl = document.createElement('ul')
  addsUl.innerHTML = adds.map(addIntoAnchorHTML).join('\n')
  return addsUl
}