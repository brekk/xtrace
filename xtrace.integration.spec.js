import test from 'ava'
import execa from 'execa'

test(`makeInspectors`, (t) => {
  t.plan(1)
  return execa(`DEBUG=x:* node ${process.cwd()}/debug.fixture.js`, [])
    .then((x) => {
      t.is(x, ``)
    })
})
