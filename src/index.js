import mems from 'mems'
import withHooks, { useState, useEffect } from 'react-with-hooks'

import listener from './utilities/listener'
import getStorageValues from './utilities/getStorageValues'
import attachEventListeners from './utilities/attachEventListeners'

// SIDE EFFECTS: Attaches window event listeners for
// 'localStorageChanged' and 'sessionStorageChanged'.
attachEventListeners()

const useStorage = mems((...args) => {
  // For use wrapping function components.
  if (typeof args[0] === 'function') {
    return withHooks(args[0])
  }

  // For use inside wrapped components.
  return useStorageHook(...args)
})

const useStorageHook = (which, keys) => {
  const storage = getStorageValues(window[`${which}Storage`], ...keys)
  const [state, setState] = React.useState(storage)

  useEffect(() => {
    const eventName = `${which}StorageChanged`

    const handler = event => {
      event.detail.key in storage &&
        setState({
          ...state,
          [event.detail.key]: event.detail.value,
        })
    }

    return listener(eventName, handler)
  }, 0) // Never re-run this effect.

  return state
}

useStorage.withHooks = withHooks
export default useStorage
