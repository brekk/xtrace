/* global test */
import {
  curry
} from 'katsu-curry'
import {makeLoggers} from './debug/index'
import {t} from './test-helpers'

test(`makeLoggers`, () => {
  const injectLogger = curry((expectedA, expectedB, tag, z, d, inputA, inputB) => {
    t.is(expectedA, inputA)
    t.is(expectedB, inputB)
    return inputB
  })
  const injected = injectLogger(100, `word`)
  const [logger] = makeLoggers(injected, [`a`])
  logger(100, `word`)
})
