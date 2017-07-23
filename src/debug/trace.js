import {xtrace} from '../core/xtrace'
import {__wrap} from './wrap'

// this is largely for testing, but is exported for convenience
/**
 * @method trace
 * @namespace xtrace.debug.custom
 * @param {function} fn - a function to set as the side-effect
 * @param {*} a - first param to log (or whatever is being passed in as the side-effect)
 * @param {*} b - second param to log (or whatever)
 * @returns {*} b - whatever b parameter was
 * @public
 */
export const __trace = __wrap(xtrace)
