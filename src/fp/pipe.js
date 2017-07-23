// eslint-disable-next-line fp/no-rest-parameters
export const pipe = (...fns) => (x) => {
  if (!(fns && fns.reduce)) {
    throw new TypeError(`Expected functor to be foldable. Got: ${fns}`) // eslint-disable-line fp/no-throw
  }
  return fns.reduce((current, next) => {
    const y = next(current)
    return y
  }, x)
}
