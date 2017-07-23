import {curry} from 'katsu-curry'
import map from 'ramda/src/map'
import pipe from 'ramda/src/pipe'

/**
 * Likely this function shouldn't be invoked directly unless you are behaving with intention,
 * but see the tests for more.
 * @method wrap
 * @namespace xtrace.debug.custom
 * @param {function} bug - a function which is closured like the `debug` function
 * @param {function} fn - function to invoke after the debug function
 * @returns {function} a HOF which can map over a functor
 * @protected
 */
export const __wrap = curry((fn, bug) => map(pipe(bug, fn)))
