import { curry } from "katsu-curry"

/**
 * Pass a value to a side effect function but return the original value
 * @method sideEffect
 * @param {Function} fn - a function
 * @param {*} a - anything
 * @return a
 * @example
 * import {sideEffect} from 'xtrace'
 * import {pipe} from 'f-utility'
 * const eventLog = x => {
 *   // something async
 * }
 * const multiplyByTwoAndNotify = pipe(
 *   x => x * 2,
 *   sideEffect(eventLog)
 * )
 */
export const sideEffect = curry((fn, a) => {
  fn(a)
  return a
})

/**
 * Pass a value and a tag to a side effect function but return the value
 * @method taggedSideEffect
 * @param {Function} fn - a function
 * @param {*} a - anything
 * @param {*} b - anything
 * @return b
 * @example
 * import {taggedSideEffect} from 'xtrace'
 * import {pipe, curry} from 'f-utility'
 * const binaryEventLog = (x, y) => {
 *   // something async with two params
 * }
 * const eventLog = taggedSideEffect(binaryEventLog)
 * const multiplyByTwoAndNotifyBinary = pipe(
 *   x => x * 2,
 *   eventLog("something happened")
 * )
 */
export const taggedSideEffect = curry((fn, a, b) => {
  fn(a, b)
  return b
})
/**
 * Log a value and a tag but return the value
 * @method trace
 * @param {Function} fn - a function
 * @param {*} a - something to log
 * @param {*} b - some value
 * @return b
 * @example
 * import { trace } from 'xtrace'
 * import { pipe, curry } from 'f-utility'
 * const loggingDoubler = pipe(
 *   trace('input'),
 *   x => x * 2,
 *   trace('output')
 * )
 */
export const trace = taggedSideEffect(console.log)

/**
 * Pass a transformed value and a tag but return the value
 * @method scopedSideEffect
 * @param {Function} fn - a function
 * @param {Function} fn2 - a transformer function
 * @param {*} a - anything
 * @param {*} b - anything
 * @return b
 * @example
 * import {scopedSideEffect} from 'xtrace'
 * import {curry, pipe} from 'f-utility'
 * const showType = x => typeof x
 * const scopedLogger = scopedSideEffect(console.log)
 * const incrementer = (() => {
 *   let count = 0
 *   return () => count++
 * })()
 * const loggingDoublerWithXray = pipe(
 *   scopedLogger(showType, 'type of input'),
 *   x => x * 2,
 *   scopedLogger(incrementer, 'times run')
 * )
 */
export const scopedSideEffect = curry((fn, fn2, a, b) => {
  fn(a, fn2(b))
  return b
})

/**
 * Log a transformed value and a tag but return the value
 * @method scopedTrace
 * @param {Function} fn - a transformer function
 * @param {*} a - anything
 * @param {*} b - anything
 * @return b
 */
export const scopedTrace = scopedSideEffect(console.log)
