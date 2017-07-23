import {$} from 'katsu-curry'
import {xtrace} from '../core/xtrace'
import {debugWrap, wrap} from './wrap'

/* istanbul ignore next */
export const debugTrace = debugWrap(xtrace)
export const __debugTrace = wrap($, xtrace)
