import {curry, PLACEHOLDER as $} from './curry'

/**
 * `import {sideEffect} from 'xtrace'`
 *
 * The high-level abstraction for identity-closure side-effects
 * @method sideEffect
 * @param {function} effect - function which does something independent of the returned value
 * @param {*} tag - first value to pass to the side effect
 * @param {function} inspect - function which wraps the second value to pass to the side effect
 * @param {*} input - the return value, and the value passed to the inspect function
 * @returns {*} - whatever input is
 * @public
 */
export const sideEffect = curry(
  function __sideEffect(effect, tag, inspect, input) {
    // something happens here! (it's a side effect!)
    effect(tag, inspect(input))
    // return the last value you're given
    return input
  }
)

// identity function
export const I = (x) => x

/**
 * `import {xtrace} from 'xtrace'`
 *
 * xtrace is the same as sideEffect, only we dropped the inspect parameter by passing identity
 * @method xtrace
 * @param {function} effect - function which does something independent of the returned value
 * @param {*} tag - first value to pass to the side effect
 * @param {*} input - the return value, and the value passed to the side effect
 * @returns {*} - whatever input is
 * @public
 */
export const xtrace = sideEffect($, $, I, $)

/**
 * `import {trace} from 'xtrace'`
 *
 * trace is the same as xtrace, only we applied the first parameter as console.log, for convenience
 * @method trace
 * @param {*} tag - first value to pass to the console.log
 * @param {*} input - the return value, and the value passed to the console.log
 * @returns {*} - whatever input is
 * @public
 */
export const trace = xtrace(console.log) // eslint-disable-line no-console
