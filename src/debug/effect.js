import {sideEffect} from '../core/side-effect'
import {__wrap} from './wrap'

/**
 * @method effect
 * @namespace xtrace.debug.custom
 * @param {function} fn - a function to set as the side-effect
 * @param {*} a - first param to log (or whatever is being passed in as the side-effect)
 * @param {function} inspect - a function to inspect the second parameter
 * @param {*} b - second param to log (or whatever)
 * @returns {*} b - whatever b parameter was
 * @public
 */
export const __effect = __wrap(sideEffect)
