import { API, expand } from '../lib/consts.js'
import { noId, noAdd, addsDBName, findAdd } from './lib/consts.js'

export const addDetailsModel = async ({ addId }) => {
  try {
    /* It works, but to avoid a fetch of just ONE add
       we are making that a user can see the add details
       of an already deleted add or see oudated add details
       from an updated add
    const addsDB = JSON.parse(sessionStorage.getItem(addsDBName))

    if (addsDB && findAdd({ adds: addsDB, addId })) {
      
      return { add: findAdd({ adds: addsDB, addId }) }
    }*/
    const query = `${API.ADD}/${addId}${expand}`
    const response = await fetch(query)
    const fetchedAdd = await response.json()

    if (fetchedAdd.id !== addId) throw new Error(noAdd)

    return { add: fetchedAdd }
  } catch (error) {
    throw new Error(error.message)
  }
}