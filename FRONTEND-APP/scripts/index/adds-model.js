//import { addsDBName } from '../add-details/lib/consts.js'
import { API } from '../lib/consts.js'
import { noAddsMessage } from './lib/consts.js'

// query params for pagination
// _page & _limit
export const addsModel = async ({ queryParams }) => {
  try {
    const { pageValue, limitValue, likeKey, likeValue, gteValue, lteValue } = queryParams
    /* It works, but will lead in worse user experience
       cause it can show adds that are being deleted
       and wont remove them until sessionStorage expires

    const addsDB = JSON.parse(sessionStorage.getItem('addsDB'))
    if (!pageValue && !limitValue && addsDB) {
      return { adds: addsDB }
    }
    */
    let query = API.ADDS
    if (pageValue && limitValue) {
      query = `${query}&_page=${pageValue}&_limit=${limitValue}`
    }

    if (likeValue) {
      query = `${query}&${likeKey}_like=${likeValue}`
    }

    if (gteValue) {
      query = `${query}&price_gte=${gteValue}`
    }

    if (lteValue) {
      query = `${query}&price_lte=${lteValue}`
    }

    const response = await fetch(query)
    const fetchedAdds = await response.json()

    if (!fetchedAdds.length){
      throw new Error(noAddsMessage)
    } else {
      /* Works, but i quitted ALL the sessionStorage usage
         even wehn i dedicated to it hours, cause is not
         worth the fetches i can avoid compared with the
         worse user experience, or the extra code to handle it
      if (!pageValue && !limitValue) {
        sessionStorage.setItem(addsDBName, JSON.stringify(fetchedAdds))
      }*/
      return { adds: fetchedAdds }
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
