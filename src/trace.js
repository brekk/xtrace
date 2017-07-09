import {I as identity, curry, PLACEHOLDER as __} from 'katsu-curry'

export const PLACEHOLDER = __
export const $ = __
export const I = identity

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

/**
 * xtrace is the same as sideEffect, only we dropped the inspect parameter by passing identity
 * @method xtrace
 * @param {function} effect - function which does something independent of the returned value
 * @param {*} tag - first value to pass to the side effect
 * @param {*} input - the return value, and the value passed to the side effect
 * @returns {*} - whatever input is
 * @public
 * @example
 * import {xtrace} from 'xtrace'
 * import _debug from 'debug'
 * const debug = _debug(`my:custom:debugger`)
 * const trace = xtrace(debug)
 * // [...]
 * trace(`input`, 5) // only logs if DEBUG env var (e.g. DEBUG=my:custom:debugger node this-file.js)
 */
export const xtrace = sideEffect(__, __, I, __)

/**
 * trace is the same as xtrace, only we applied the first parameter as console.log, for convenience
 * @method trace
 * @param {*} tag - first value to pass to the console.log
 * @param {*} input - the return value, and the value passed to the console.log
 * @returns {*} - whatever input is
 * @public
 * @example
 * import {trace} from 'xtrace'
 * trace(`whatever`, 5) // logs 'whatever', 5
 */
export const trace = xtrace(console.log) // eslint-disable-line no-console
