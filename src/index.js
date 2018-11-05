import React from 'react'
import memize from 'memize'

import storageChanged from 'storage-changed'
import storageUtils from 'storage-utilities'

storageChanged('local')
storageChanged('session')

const addListener = window.addEventListener
const removeListener = window.removeEventListener

// Only ever runs one time when mounted and
// one time when unmounting (if the effect
// returns a function.)
const usePureEffect = effect => {
  return React.useEffect(effect, 0)
}

// Pulls the values out of the specified storage object,
// parses them and returns the soon-to-be state object.
const getStorageValues = memize((which, keys) => {
  const storage = window[`${which}Storage`]

  const final = keys.reduce((final, key) => {
    final[key] = storageUtils.parse(storage[key])
    return final
  }, {})

  final.setItem = storage.setItem

  return final
})

const useStorage = (which, keys) => {
  const storage = getStorageValues(which, keys)
  const [state, setState] = React.useState(storage)

  usePureEffect(() => {
    const eventName = `${which}StorageChanged`

    const handler = event => {
      setState({
        ...state,
        [event.detail.key]: event.detail.value,
      })
    }

    addListener(eventName, handler)

    return () => {
      removeListener(eventName, handler)
    }
  })

  return state
}

export default useStorage
