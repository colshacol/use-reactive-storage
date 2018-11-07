import listener from '../listener'

const NOOP = () => {}

beforeEach(() => {
  window.addEventListener = jest.fn(() => {})
  window.removeEventListener = jest.fn(() => {})
})

test('listener', () => {
  const remove = listener('foo', NOOP)
  expect(window.addEventListener).toHaveBeenCalled()
  remove('foo', NOOP)
  expect(window.removeEventListener).toHaveBeenCalled()
})
