import { addsHeading } from './addsH2-view.js'
import { addsPaginationButtons } from './addsPaginationNav-view.js'
import { addsList } from './addsUl-view.js'
import { clearFiltersButtonView } from './clearFiltersButton-view.js'
import { filterFormView } from './filterForm-view.js'
import { priceFilterFormView } from './priceFilterForm-view.js'
// import { tagsCheckBoxesFormView } from './tagsCheckboxForm-view.js'

export const addsView = ({ viewState }) => {
  const addsDiv = document.createElement('div')
  const addsH2 = addsHeading()
  const nameFilterForm = filterFormView({ id: 'name', name: 'name' })
  const tagsFilterForm = filterFormView({ id: 'tags', name: 'tags' })
  const clearFiltersAnchor = clearFiltersButtonView()
  const priceFilterForm = priceFilterFormView()
  // const tagsCheckBoxesForm = tagsCheckBoxesFormView({ uniqueTags: viewState.uniqueTags })
  const addsPaginationNav = addsPaginationButtons({ pagButtonText: viewState.pagButtonText, isLastPage: viewState.isLastPage, isFirstPage: viewState.isFirstPage })
  const addsUl = addsList({ adds: viewState.adds })
    
  addsDiv.appendChild(addsH2)
  addsDiv.appendChild(nameFilterForm)
  addsDiv.appendChild(tagsFilterForm)
  addsDiv.appendChild(priceFilterForm)
  addsDiv.appendChild(clearFiltersAnchor)
  // addsDiv.appendChild(tagsCheckBoxesForm)
  addsDiv.appendChild(addsPaginationNav)
  addsDiv.appendChild(addsUl)

  return addsDiv
}
