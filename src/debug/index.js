// import bug from 'debug'
import {curry, $, I as identity, map, pipe} from 'f-utility'
import {sideEffect} from '../core/side-effect'

/**
 * makeInspectors with debug
 * @method debug.makeInspectors
 * @param {function} bug - a debugging function, ostensibly
 * @param {strings[]} logList - a list of strings
 * @returns {functions[]} inspector functions
 * @public
 * @example
 * import bug from 'debug'
 * import {debug} from 'xtrace'
 * const [base, detail, verbose] = debug.makeInspectors(bug, [`mylib:0`, `mylib:1`, `mylib:2`])
 * base(`a`, (x) => JSON.stringify(x, null, 2), {data: `cool`})
 */
/* istanbul ignore next */
export const makeInspectors = curry((bug, logList) => pipe(
  map(bug),
  map((s) => sideEffect(s))
)(logList))

/**
 * makeLoggers with debug
 * @method debug.makeLoggers
 * @param {function} bug - a debugging function, ostensibly
 * @param {strings[]} logList - a list of strings
 * @returns {functions[]} inspector functions
 * @public
 * @example
 * import bug from 'debug'
 * import {debug} from 'xtrace'
 * const [base, detail, verbose] = debug.makeInspectors(bug, [`mylib:0`, `mylib:1`, `mylib:2`])
 * base(`a`, {data: `cool`})
 */
export const makeLoggers = curry((bug, logList) => pipe(
  map(bug),
  map((s) => sideEffect(s, $, identity, $))
)(logList))
