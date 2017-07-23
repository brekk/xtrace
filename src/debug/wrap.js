import {curry} from 'katsu-curry'
import debug from 'debug'
import {map} from '../fp/map'
import {pipe} from '../fp/pipe'

export const wrap = curry((bug, fn) => map(pipe(bug, fn)))
export const debugWrap = wrap(debug)
