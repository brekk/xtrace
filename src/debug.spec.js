/* global test */
import {t} from 'germs/lib/testing/helper'
import {
  curry
} from 'f-utility'
import {makeLoggers} from './debug'

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
