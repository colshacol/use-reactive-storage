import 'jest-localstorage-mock'
import getStorageValues from '../getStorageValues'

const NOOP = () => {}

const mockStorage = {
  setItem: NOOP,
  a: 'yo',
  b: 'true',
  c: 'null',
  d: JSON.stringify({ name: 'tommy' }),
}

test('getStorageValues', () => {
  const result = getStorageValues(mockStorage)
  console.log(result)
  expect(typeof result.a).toBe('string')
  expect(typeof result.b).toBe('boolean')
  expect(typeof result.c).toBe('object')
  expect(typeof result.d).toBe('object')
  expect(result).toHaveProperty('setItem')
})
