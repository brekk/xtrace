/* global test */
// import * as g from 'germs'
import {
  $,
  curry,
  I
} from 'f-utility'
import {t} from 'jest-t-assert'
import {sideEffect} from './side-effect'

const is = curry((isWrap, a, b) => isWrap(a, b))

test(`sideEffect can function as a simple tagged iteratee`, () => {
  t.plan(7)
  t.is(typeof sideEffect, `function`)
  const logger = sideEffect(is(t.is), $, I, $)
  t.is(typeof logger, `function`)
  const inputs = [
    [`a`, `a0`],
    [`b`, `b1`],
    [`c`, `c2`],
    [`d`, `d3`],
    [`e`, `e4`]
  ]
  inputs.map(([k, v], i) => {
    logger(k + i, v)
  })
})
