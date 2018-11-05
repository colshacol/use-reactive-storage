const React = require('react')
const memize = require('memize')
const storageChanged = require('storage-changed')
const storageUtils = require('storage-utilities')

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
      event.detail.key in storage &&
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

module.exports = useStorage
