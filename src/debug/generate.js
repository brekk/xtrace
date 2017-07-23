import {curry} from 'katsu-curry'
import {
  __trace
} from './trace'
import {
  __effect
} from './effect'

/**
 * @method generate
 * @namespace xtrace.debug.custom
 * @param {function} fn - a function to act as a debug ((a) => (b) => a + b)
 * @param {boolean} interactive - make an inspector (true) or a logger (false)
 * @param {strings[]} namespaces - a list of namespaces to pass to the debug function
 * @returns {function} an inspector or a logger, or something else, if you passed in something
 * weird as `fn`
 * @public
 */
export const __generate = curry(
  (fn, interactive, namespaces) => (
    (
      interactive ?
        __effect(fn) :
        __trace(fn)
    )(namespaces)
  )
)
