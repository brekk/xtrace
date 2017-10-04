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
 * import {sideEffect, $, I} from 'xtrace'
 * import _debug from 'debug'
 * const debug = _debug(`my:custom:debugger`)
 * const trace = sideEffect(debug, $, I, $)
 * // [...]
 * trace(`input`, 5) // only logs if DEBUG env var (e.g. DEBUG=my:custom:debugger node this-file.js)
 */
export const sideEffect = curry(
  function __sideEffect(effect, tag, inspect, input) {
    // something happens here! (it's a side effect!)
    effect(tag, inspect(input))
    // return the last value you're given
    return input
  }
)
