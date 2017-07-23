import test from 'ava'
import {
  curry,
  I
} from 'katsu-curry'
import * as D from './debug'

const zort = (x) => x.sort() // eslint-disable-line fp/no-mutating-methods

// a variant on the `entrust` pattern
const t2 = curry((fn, t, a, b) => t[fn](a, b))

// we can do some tricks with this shortly
const tIs = t2(`is`)
const tEqual = t2(`deepEqual`)

const tAp = (t) => (x) => x(t)

test(`exports`, (t) => {
  const [is, equal] = [tIs, tEqual].map(tAp(t))
  is(typeof D, `object`)
  equal(
    zort(
      Object.keys(D)
    ), zort(
      [
        `__debugEffect`,
        `__debugTrace`,
        `__makeInspectors`,
        `debugEffect`,
        `debugTrace`,
        `debugWrap`,
        `makeInspectors`,
        `wrap`
      ]
    )
  )
})

/*
normally:

const log = debug('tagged:namespace')
log('my info later') // only logs if DEBUG=tagged:namespace || DEBUG=tagged:* || DEBUG=*

augmented with sideEffect:

const inspector = sideEffect(log) // implicit: aTag, fn, bTag
const compositionLog = inspector($, I, $) // expects a, b tags

pipe(
  compositionLog(`input`), // partially apply the aTag
  myFunction,
  compositionLog(`output`) // partially apply the aTag
)

augmented with __debugEffect (this is intended to work with the debug module, but testing
side-effects is hard):

const debugEffect = __debugEffect(require('debug'))
const myLoggers = debugEffect([`ns:1`, `ns:2`, `ns:3`])

const [log1, log2, log3] = myLoggers

pipe(
  log1(`input`, (x) => x.toString()) // these are inspectors by default
)
 */

test(`__debugEffect - only the __ prefixed functions are testable`, (t) => {
  t.plan(4)
  const equal = tEqual(t)
  // eslint-disable-next-line fp/no-rest-parameters
  const pseudoDebug = (...args) => (...bargs) => {
    equal(args[0], `a`)
    equal(bargs, [`AAAAA`, `BBBBB`])
  }
  // we can derive __debugEffect from __makeInspectors, which will give us 100% coverage
  // const debugInspectors = D.__debugEffect(pseudoDebug)
  const debugInspectors = D.__makeInspectors(pseudoDebug, true)
  const tags = `abc`.split(``)
  const inspectors = debugInspectors(tags)
  inspectors[0](`AAAAA`, I, `BBBBB`)
  const debugLoggers = D.__makeInspectors(pseudoDebug, false)
  const loggers = debugLoggers(tags)
  loggers[0](`AAAAA`, `BBBBB`)
})
