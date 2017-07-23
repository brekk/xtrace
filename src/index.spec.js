import test from 'ava'
import {
  $,
  curry,
  I
} from 'katsu-curry'
import {sideEffect} from './core/side-effect'

const is = curry((t, a, b) => t.is(a, b))

test(`sideEffect can function as a simple tagged iteratee`, (t) => {
  t.plan(7)
  t.is(typeof sideEffect, `function`)
  const logger = sideEffect(is(t), $, I, $)
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
