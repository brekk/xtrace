import {I, $} from 'f-utility'

import {sideEffect} from './side-effect'

/**
 * xtrace is the same as sideEffect, only we drop the inspect parameter by passing identity
 * @method xtrace
 * @param {function} effect - function which does something independent of the returned value
 * @param {*} tag - first value to pass to the side effect
 * @param {*} input - the return value, and the value passed to the side effect
 * @returns {*} - whatever input is
 * @public
 * @example
 * import {xtrace} from 'xtrace'
 * const effect = console.log
 * const tag = `item moved!`
 * const input = `pseudo:event:name`
 * // running it straight like this, there's less utility:
 * xtrace(effect, tag, input) // prints: item moved! pseudo:event:name
 * // but if we imagine it as part of a composed function pipeline
 * // pipe(
 * //   moveLeft, // (ostensibly this would move the element to the left)
 * //   sideEffect(effect, tag) // it becomes more useful as a reusable logger
 * // )
 */
export const xtrace = sideEffect($, $, I, $)
