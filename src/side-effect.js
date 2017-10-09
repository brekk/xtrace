import {curry} from 'f-utility'

/**
 * The high-level abstraction for identity-closure side-effects
 * @method sideEffect
 * @param {function} effect - function which does something independent of the returned value
 * @param {*} tag - first value to pass to the side effect
 * @param {function} inspect - function which wraps the second value to pass to the side effect
 * @param {*} input - the return value, and the value passed to the inspect function
 * @returns {*} - whatever input is
 * @public
 * @example
 * import {sideEffect} from 'xtrace'
 * const effect = console.log
 * const tag = `item moved!`
 * const inspect = ({name: x, y}) => `${name} - [${x}, ${y}]`
 * const input = {
 *   name: `pseudo:event:name`,
 *   x: 1,
 *   y: 2
 * }
 * // running it straight like this, there's less utility:
 * sideEffect(effect, tag, inspect, input) // prints: item moved! pseudo:event:name - [1, 2]
 * // but if we imagine it as part of a composed function pipeline
 * // pipe(
 * //   moveLeft, // (ostensibly this would move the element to the left)
 * //   sideEffect(effect, tag, inspect) // it becomes more useful as a reusable logger
 * // )
 */
export const sideEffect = curry(
  function __sideEffect(effect, tag, inspect, input) {
    // something happens here! (it's a side effect!)
    effect(tag, inspect(input))
    // return the last value you're given
    return input
  }
)
