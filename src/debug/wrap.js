import {curry} from 'katsu-curry'
import debug from 'debug'
import map from 'ramda/src/map'
import pipe from 'ramda/src/pipe'

export const wrap = curry((bug, fn) => map(pipe(bug, fn)))

// this is largely untestable
/* istanbul ignore next */
export const debugWrap = wrap(debug)
