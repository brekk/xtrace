/* global test */
import {t} from 'jest-t-assert'
// import {t} from 'germs'
import {
  curry
} from 'f-utility'
import {makeLoggers} from './debug'

// export const t = {
//   plan: (x) => expect.assertions(x),
//   is: (a, b) => expect(a).toBe(b)
// }
test(`makeLoggers`, () => {
  // t.plan(2)
  const injectLogger = curry((expectedA, expectedB, tag, z, d, inputA, inputB) => {
    t.is(expectedA, inputA)
    // expect(expectedA).toBe(inputA)
    t.is(expectedB, inputB)
    // expect(expectedB).toBe(inputB)
    return inputB
  })
  const injected = injectLogger(100, `word`)
  const [logger] = makeLoggers(injected, [`a`])
  logger(100, `word`)
})
