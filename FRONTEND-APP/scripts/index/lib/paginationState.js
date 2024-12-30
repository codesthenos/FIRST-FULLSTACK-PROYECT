export const calculatePagState = ({ gteValue, lteValue, page, addsPerPage, likeKey, likeValue, pagButtonText }) => {
  const queryPagParams = { gteValue, lteValue, pageValue: page, limitValue: addsPerPage, likeKey, likeValue }
  const state = { queryParams: queryPagParams, paginationParams: { pagButtonText }}
  return state
}