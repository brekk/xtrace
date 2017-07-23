import {$} from 'katsu-curry'
import {sideEffect} from '../core/side-effect'
import {debugWrap, wrap} from './wrap'

/* istanbul ignore next */
export const debugEffect = debugWrap(sideEffect)
export const __debugEffect = wrap($, sideEffect)
