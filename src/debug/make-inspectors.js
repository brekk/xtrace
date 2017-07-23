import debug from 'debug'
import {curry} from 'katsu-curry'
import {
  __debugTrace
} from './trace'
import {
  __debugEffect
} from './effect'

export const __makeInspectors = curry(
  (fn, interactive, namespaces) => (
    (
      interactive ?
        __debugEffect(fn) :
        __debugTrace(fn)
    )(namespaces)
  )
)

export const makeInspectors = __makeInspectors(debug)
