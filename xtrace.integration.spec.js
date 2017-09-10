/* global test, expect */
import execa from 'execa'

const map = (fn) => (x) => x.map(fn)

const alterLines = map((line) => {
  // dow day month year time tz debug tag value
  // Sun, 06 Aug 2017 21:16:00 GMT x:1 input 100
  const parts = line.split(` `)
  parts.splice(-5, 1) // eslint-disable-line fp/no-mutating-methods
  return parts
})
const t = {
  plan: (x) => expect.assertions(x),
  deepEqual: (a, b) => expect(a).toEqual(b)
}

test(`makeInspectors`, () => {
  t.plan(8)
  return execa.shell(`DEBUG=x:* node ${process.cwd()}/xtrace.integration.fixture.js`)
    .then((x) => {
      const now = new Date()
      const dateParts = now.toUTCString().split(` `)
      const lines = x.stderr.split(`\n`)
      const altered = alterLines(lines)
      /* eslint-disable no-unused-vars */
      const [
        dayOfTheWeek, day, month, year, hardToMatch, tz
      ] = dateParts
      /* eslint-enable no-unused-vars */
      const dates = [dayOfTheWeek, day, month, year, tz]
      t.deepEqual(
        altered[0],
        [...dates, `x:1`, `input`, `100`]
      )
      t.deepEqual(
        altered[1],
        [...dates, `x:2`, `added`, `102`]
      )
      t.deepEqual(
        altered[2],
        [...dates, `x:3`, `subtracted`, `100`]
      )
      t.deepEqual(
        altered[3],
        [...dates, `x:1`, `output`, `100`]
      )
      t.deepEqual(
        altered[4],
        [...dates, `x:1`, `input`, `40`]
      )
      t.deepEqual(
        altered[5],
        [...dates, `x:2`, `added`, `44`]
      )
      t.deepEqual(
        altered[6],
        [...dates, `x:3`, `subtracted`, `40`]
      )
      t.deepEqual(
        altered[7],
        [...dates, `x:1`, `output`, `40`]
      )
    })
})
