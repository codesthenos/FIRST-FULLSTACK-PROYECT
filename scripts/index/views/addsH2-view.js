import { addsH2Text, addsH2ClassName } from '../lib/consts.js'

export const addsHeading = () => {
  const addsH2 = document.createElement('h2')
  addsH2.textContent = addsH2Text
  addsH2.classList.add(addsH2ClassName)
  return addsH2
}