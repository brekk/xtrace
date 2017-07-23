import {curry} from 'katsu-curry'
import {debugTrace} from './trace'
import {debugEffect} from './effect'

export const makeInspectors = curry(
  (interactive, namespaces) => (
    interactive ?
      debugEffect :
      debugTrace
  )(namespaces)
)
