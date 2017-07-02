export const PLACEHOLDER = `🍛`

/**
 * count how many placeholders are in a given list of arguments
 * @method countNonPlaceholdersFn
 * @param {function} test - a test function
 * @param {array} args - a list of parameters to test
 * @returns {number} - total arguments
 */
const countNonPlaceholdersFn = (test) => (args) => args.reduce(
  (count, x) => (
    test(x) ? count : count + 1
  ),
  0
)

/**
 * manually curried Array.prototype.some
 * @method some
 * @param {function} f - function to pass to [some]
 * @param {Array} xs - an array or something with [some] method
 * @returns {boolean} - the result
 */
const some = (f) => (xs) => xs.some(f)

/**
 * @method mergeParams
 * @param {function} test - something to test whether a given argument is a placeholder
 * @param {Array} a - first argument list to compare
 * @param {Array} b - second argument list to compare
 * @returns {Array} - merged argument lists
 */
const mergeParamsByTest = (test) => (a, b) => a.map(
  (y) => (
    test(y) && b[0] ?
    b.shift() : // eslint-disable-line fp/no-mutating-methods
    y
  )
).concat(b)

/**
 * @method curryPowder
 * @param {function} test - a function which asserts whether a given parameter is a placeholder
 * @param {function} fn - a function to be curried
 * @returns {function} - a curried function
 */
export const curryPowder = (test) => (fn) => {
  const countNonPlaceholders = countNonPlaceholdersFn(test)
  const mergeParams = mergeParamsByTest(test)
  const hasSauce = some(test)
  function curried(...args) { // eslint-disable-line fp/no-rest-parameters
    const length = hasSauce(args) ? countNonPlaceholders(args) : args.length
    return (
      length >= fn.length ?
      fn.apply(this, args) :
      function partialSauce(...args2) { // eslint-disable-line fp/no-rest-parameters
        return curried.apply(this, mergeParams(args, args2))
      }
    )
  }
  // istanbul ignore next
  // eslint-disable-next-line fp/no-mutation
  curried.toString = () => (
    fn.name ? fn.name : fn.toString()
  )
  return curried
}

/**
 * test whether two symbols match
 * @method symbolTest
 * @param {*} x - symbol lookup x
 * @param {*} y - symbol lookup y
 * @returns {boolean} - whether the two symbols match
 */
export const symbolTest = (x) => (y) => Symbol.for(y) === Symbol.for(x)

/**
 * @method currify
 * @param {function} test - a function that tests for placeholder-iness
 * @returns {function} - function which can curry other functions
 */
export const curryify = (test) => curryPowder(test, curryPowder)

// we export `curry` with an automatic symbolTest for PLACEHOLDER in place
export const curry = curryify(symbolTest(PLACEHOLDER))
