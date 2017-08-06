// import bug from 'debug'
import {curry, $, I as identity, map, pipe} from 'f-utility'
import {sideEffect} from '../core/side-effect'

/* istanbul ignore next */
export const makeInspectors = curry((bug, logList) => pipe(
  map(bug),
  map((s) => sideEffect(s))
)(logList))

export const makeLoggers = curry((bug, logList) => pipe(
  map(bug),
  map((s) => sideEffect(s, $, identity, $))
)(logList))
