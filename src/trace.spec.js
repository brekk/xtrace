import test from 'ava'
import {
  PLACEHOLDER as $,
  curry
} from 'katsu-curry'
import {
  sideEffect
} from './trace'

test(`sideEffect can function as a simple tagged iteratee`, (t) => {
  t.plan(7)
  const I = (x) => x
  const is = curry((a, b) => t.is(a, b))
  t.is(typeof sideEffect, `function`)
  const logger = sideEffect(is, $, I, $)
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
