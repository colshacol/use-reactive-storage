export default (eventName, handler) => {
  window.addEventListener(eventName, handler)

  return () => {
    window.removeEventListener(eventName, handler)
  }
}
