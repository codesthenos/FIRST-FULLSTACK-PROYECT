import { paginateButtonId, nextPageButtonId, previousPageButtonId, paginateButtonText, showAllButtonText, initialPage, addsPerPage } from './lib/consts.js'
import { calculatePagState } from './lib/paginationState.js'
import { addsModel } from './adds-model.js'
import { addsView } from './views/adds-view.js'
import { fireNotificationEvent } from '../lib/fire-notification-event.js'
import { errorNoti, loadingNoti } from '../lib/consts.js'
import { removeLoadingClassNames } from '../lib/removeLoadingClassNames.js'
import { calculateFiltersState } from './lib/filtersState.js'
import { validatePrice } from './lib/validatePriceFilter.js'

export const indexController = async ({ element, notificationElement, state }) => {

  fireNotificationEvent({ element, type: loadingNoti })
  
  try {
    const currentQueryParams = state.queryParams
    const currentPaginationParams = state.paginationParams

    const currentPage = currentQueryParams.pageValue
    const limitAdds = currentQueryParams.limitValue
    const filterKey = currentQueryParams.likeKey
    const filterValue = currentQueryParams.likeValue
    const priceMin = currentQueryParams.gteValue
    const priceMax = currentQueryParams.lteValue

    const countAddsQueryParams = { pageValue: null, limitValue: null, likeKey: filterKey, likeValue: filterValue, gteValue: priceMin, lteValue: priceMax }
    
    const [response, response2] = await Promise.all([
      addsModel({ queryParams: currentQueryParams }),

      addsModel({ queryParams: countAddsQueryParams })
    ])

    const numberOfFilteredAdds = response2.adds.length

    const uniqueTags = Array.from(
      new Set(response2.adds.flatMap(add => add.tags)))
      .filter(tag => tag)

    const pagButtonText = currentPaginationParams.pagButtonText
    const isLastPage = currentPage * limitAdds >= numberOfFilteredAdds
    const isFirstPage = currentPage <= 1

    const currentViewState = { uniqueTags, adds: response.adds, pagButtonText, isFirstPage, isLastPage }

    const addsDiv = addsView({ viewState: currentViewState })
    element.innerHTML = ''
    element.appendChild(addsDiv)
    // Show the filter VALUE after search
    if (filterKey === 'name') {
      const nameFilterInput = document.getElementById('name')
      nameFilterInput.value = filterValue
    } else if (filterKey === 'tags') {
      const tagsFilterInput = document.getElementById('tags')
      tagsFilterInput.value = filterValue.replace(/-/g, ' ')
    }
    const priceMinInput = document.getElementById('min-price')
    priceMinInput.value = priceMin

    const priceMaxInput = document.getElementById('max-price')
    priceMaxInput.value = priceMax
    // PRICE FILTER
    const priceFilterForm = document.getElementById('price-filter-form')

    priceFilterForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const minValue = priceMinInput.value
      const maxValue = priceMaxInput.value

      const { price, errors } = validatePrice({ minValue, maxValue })

      if (errors.length > 0) {
        fireNotificationEvent({ element, type: errorNoti, errorList: errors })
      } else {
        price.min = minValue ? minValue : null
        price.max = maxValue ? maxValue : null

        const filteredQueryParams = { gteValue: price.min, lteValue: price.max, pageValue: currentPage, limitValue: limitAdds, likeKey: filterKey, likeValue: filterValue }
        const filteredState = { queryParams: filteredQueryParams, paginationParams: { pagButtonText }}
  
        indexController({ element, notificationElement, state: filteredState })
      }
    })
    // NAME FILTER
    const nameFilterForm = document.getElementById('name-filter-form')

    nameFilterForm.addEventListener('submit', (event) => {
      event.preventDefault()

      const filteredState = calculateFiltersState({ inputId: 'name', gteValue: priceMin, lteValue: priceMax, pageValue: currentPage, limitValue: limitAdds, pagButtonText })

      indexController({ element, notificationElement, state: filteredState })
    })
    // TAGS FILTER
    const tagsFilterForm = document.getElementById('tags-filter-form')

    tagsFilterForm.addEventListener('submit', (event) => {
      event.preventDefault()

      const filteredState = calculateFiltersState({ inputId: 'tags', gteValue: priceMin, lteValue: priceMax, pageValue: currentPage, limitValue: limitAdds, pagButtonText })

      indexController({ element, notificationElement, state: filteredState })
    })
    
    // after adding the pagination buttons to the DOM, i add the listeners
    // PAGINATE/SHOW ALL button
    const paginateButton = document.getElementById(paginateButtonId)
    paginateButton.addEventListener('click', () => {
      if (pagButtonText === paginateButtonText) {
        const state = calculatePagState({ gteValue: priceMin, lteValue: priceMax, page: initialPage, addsPerPage, likeKey: filterKey, likeValue: filterValue, pagButtonText: showAllButtonText })
        indexController({ element, notificationElement, state })
      } else {
        const state = calculatePagState({ gteValue: priceMin, lteValue: priceMax, page: null, addsPerPage: null, likeKey: filterKey, likeValue: filterValue, pagButtonText: paginateButtonText })
        indexController({ element, notificationElement, state })
      }
    })
    // NEXT PAGE button
    const nextPageButton = document.getElementById(nextPageButtonId)
    if (nextPageButton) {
      nextPageButton.addEventListener('click', () => {
        const state = calculatePagState({ gteValue: priceMin, lteValue: priceMax, page: currentPage + 1, addsPerPage: currentQueryParams.limitValue, likeKey: filterKey, likeValue: filterValue, pagButtonText })

        indexController({ element, notificationElement, state })
      })
    }
    // PREV PAGE button
    const previousPageButton = document.getElementById(previousPageButtonId)
    if (previousPageButton) {
      previousPageButton.addEventListener('click', () => {
        const state = calculatePagState({ gteValue: priceMin, lteValue: priceMax, page: currentPage - 1, addsPerPage: currentQueryParams.limitValue, likeKey: filterKey, likeValue: filterValue, pagButtonText })

        indexController({ element, notificationElement, state })
      })
    }
    removeLoadingClassNames({ element: notificationElement })
    // I think i dont want to throw a 'loaded succesfully after loading the homepage, that why its commented
    // fireNotificationEvent({ element, type: successNoti, message: successMsg })
  } catch (error) {
    element.innerHTML = ''
    fireNotificationEvent({ element, type: errorNoti, errorList: [error.message] })
    if (error.message === 'Failed to fetch') {
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    }
  }
}
