import {I, $} from 'f-utility'

import {sideEffect} from './side-effect'

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
export const xtrace = sideEffect($, $, I, $)
