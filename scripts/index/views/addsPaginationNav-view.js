import { showAllButtonText } from '../lib/consts.js'
import { createTogglePaginationButton } from './pagination/togglePaginationButton-view.js'
import { createNextPageButton } from './pagination/nextPageButton-view.js'
import { createPreviousPageButton } from './pagination/prevPageButton-view.js'

export const addsPaginationButtons = ({ pagButtonText, isLastPage, isFirstPage }) => {
  const paginationNav = document.createElement('nav')
  const paginationButton = createTogglePaginationButton({ pagButtonText })
  if (pagButtonText === showAllButtonText) {
    const nextPageButton = createNextPageButton({ isLastPage })
    const previousPageButton = createPreviousPageButton({ isFirstPage })
    paginationNav.appendChild(previousPageButton)
    paginationNav.appendChild(paginationButton)
    paginationNav.appendChild(nextPageButton)
    return paginationNav
  } else {
    paginationNav.appendChild(paginationButton)
    return paginationNav
  }
}