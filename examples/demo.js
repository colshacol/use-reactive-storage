import React from 'react'
import ReactDOM from 'react-dom'

import useStorage from '../src'

// FOR DEMO PURPOSES ONLY
if (!localStorage.getItem('number')) {
  localStorage.setItem('number', 125)
}

// FOR DEMO PURPOSES ONLY
if (!sessionStorage.getItem('letters')) {
  sessionStorage.setItem('letters', '...')
}

// FOR DEMO PURPOSES ONLY
const setLocalStorage = () => {
  const n = localStorage.getItem('number') - 1
  localStorage.setItem('number', n)
}

// FOR DEMO PURPOSES ONLY
const setSessionStorage = () => {
  const l = sessionStorage.getItem('letters') + 'x'
  sessionStorage.setItem('letters', l)
}

// FOR DEMO PURPOSES ONLY
const resetLocalStorage = () => {
  localStorage.setItem('number', 125)
}

// FOR DEMO PURPOSES ONLY
const resetSessionStorage = () => {
  sessionStorage.setItem('letters', '...')
}

const App = useStorage(props => {
  const local = useStorage('local', ['number'])
  const session = useStorage('session', ['letters'])

  return (
    <div>
      <button onClick={setLocalStorage}>Change LocalStorage</button>
      <button onClick={setSessionStorage}>Change SessionStorage</button>
      <p>local.number: {local.number}</p>
      <p>session.letters: {session.letters}</p>
      <button onClick={resetLocalStorage}>Reset LocalStorage</button>
      <button onClick={resetSessionStorage}>Reset SessionStorage</button>
    </div>
  )
})

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
