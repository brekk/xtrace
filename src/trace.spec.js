import test from 'ava'
import {
  PLACEHOLDER as $,
  curry
} from './curry'
import {
  sideEffect,
  I
} from './trace'

test(`sideEffect can function as a simple tagged iteratee`, (t) => {
  t.plan(6)
  const is = curry((a, b) => t.is(a, b))
  t.is(typeof sideEffect, `function`)
  const logger = sideEffect($, $, I, $)
  const inputs = [
    [`a`, `a0`],
    [`b`, `b1`],
    [`c`, `c2`],
    [`d`, `d3`],
    [`e`, `e4`]
  ]
  inputs.map(([k, v], i) => {
    logger(is, k + i, v)
  })
})
