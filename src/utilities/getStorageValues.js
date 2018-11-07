import mems from 'mems'
import storageUtils from 'storage-utilities'

// Pulls the values out of the specified storage object,
// parses them and returns the soon-to-be state object.
export default mems((storage, ...keys) => {
  const final = storageUtils.parseValues(storage)
  final.setItem = storage.setItem

  return final
})
