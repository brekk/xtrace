import test from 'ava'
import {
  curry,
  I
} from 'katsu-curry'
import D from './debug'

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
        `custom`,
        `effect`,
        `generate`,
        `trace`,
        `wrap`
      ]
    )
  )
})

/*
# normally:

const log = debug('tagged:namespace')
log('my info later') // only logs if DEBUG=tagged:namespace || DEBUG=tagged:* || DEBUG=*

# augmented with sideEffect:

const inspector = sideEffect(log) // implicit: aTag, fn, bTag
const compositionLog = inspector($, I, $) // expects a, b tags

pipe(
  compositionLog(`input`), // partially apply the aTag
  myFunction,
  compositionLog(`output`) // partially apply the aTag
)

# augmented with __effect (this is intended to work with the debug module, but testing
side-effects is hard):

const debugEffect = __effect(require('debug'))
const myLoggers = debugEffect([`ns:1`, `ns:2`, `ns:3`])

const [log1, log2, log3] = myLoggers

pipe(
  log1(`input`, (x) => x.toString()) // these are inspectors by default
)
 */

test.cb(`__effect - only the __ prefixed functions are testable`, (t) => {
  t.plan(4)
  const equal = tEqual(t)
  const A_CONSTANT = Math.round(Math.random() * 1e6)
  const B_CONSTANT = Math.round(Math.random() * 1e6)
  let count = 0 // eslint-disable-line fp/no-let
  // eslint-disable-next-line fp/no-rest-parameters
  const pseudoDebug = (...args) => (...bargs) => {
    count += 1 // eslint-disable-line fp/no-mutation
    equal(args[0], `a`)
    equal(bargs, [A_CONSTANT, B_CONSTANT])
    if (count > 1) t.end()
  }
  // we can derive __effect from __generate, which will give us 100% coverage
  // const debugInspectors = D.custom.effect(pseudoDebug)
  const debugInspectors = D.custom.generate(pseudoDebug, true)
  const tags = `abc`.split(``)
  const inspectors = debugInspectors(tags)
  inspectors[0](A_CONSTANT, I, B_CONSTANT)
  const debugLoggers = D.custom.generate(pseudoDebug, false)
  const loggers = debugLoggers(tags)
  loggers[0](A_CONSTANT, B_CONSTANT)
})
