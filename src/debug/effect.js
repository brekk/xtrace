import {sideEffect} from '../core/side-effect'
import {debugWrap} from './wrap'

export const debugEffect = debugWrap(sideEffect)
