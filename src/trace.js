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
 * const tag = `item moved!`
 * const input = `pseudo:event:name`
 * // running it straight like this, there's less utility:
 * trace(tag, input) // prints: item moved! pseudo:event:name
 * // but if we imagine it as part of a composed function pipeline
 * // pipe(
 * //   moveLeft, // (ostensibly this would move the element to the left)
 * //   trace(`moved left`) // it becomes more useful as a reusable logger
 * // )
 */
export const trace = xtrace(console.log) // eslint-disable-line no-console
