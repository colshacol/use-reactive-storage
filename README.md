# use-reactive-storage

Making `localStorage` and `sessionStorage` reactive in the same tab that they are
changed in is no easy task. But I got chu, fam.

_Works with React 15+_

## Usage

```js
import useStorage from 'use-reactive-storage'

const incrementClickCount = () => {
  const count = localStorage.getItem('clickCount')
  localStorage.setItem('clickCount', count + 1)
}

const Foo = () => {
  const local = useStorage('local', ['clickCount'])

  return (
    <div onClick={incrementClickCount}>
      <p>click count: {local.clickCount}</p>
    </div>
  )
}
```

If you are using React 15, `use-reactive-storage` will still work,
but it requires that you wrap your functional components with the
`useStorage` function, as well.

```js
const Foo = useStorage(props => {
  const local = useStorage('local', ['clickCount'])

  return (
    <div onClick={incrementClickCount}>
      <p>click count: {local.clickCount}</p>
    </div>
  )
})
```

```js
// The first argument is "local" or "session", depending on which storage you want to observe.
// The second argument is an array of keys to observe within that storage object.
useStorage('local', ['foo'])
```
