import __debug from 'debug'
import {__effect} from './effect'
import {__generate} from './generate'
import {__trace} from './trace'
import {__wrap} from './wrap'

const [
  effect,
  generate,
  trace,
  wrap
] = [
  __effect,
  __generate,
  __trace,
  __wrap
].map((x) => x(__debug))

export const debug = {
  effect,
  generate,
  wrap,
  trace,
  custom: {
    effect: __effect,
    wrap: __wrap,
    trace: __trace,
    generate: __generate
  }
}
export default debug
