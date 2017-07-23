import {xtrace} from './xtrace'

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
