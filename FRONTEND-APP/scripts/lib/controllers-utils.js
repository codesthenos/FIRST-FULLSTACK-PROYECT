export const setMainBody = ({ child }) => {
  const target = document.querySelector('main')
  target.innerHTML = ''
  target.appendChild(child)
}