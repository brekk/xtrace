const {pipe, add, subtract} = require(`f-utility`)
const {debug} = require(`./xtrace`)
const __debug = require(`debug`)

const levels = [1, 2, 3].map((i) => `x:${i}`)
const [base, detail, verbose] = debug.makeLoggers(__debug, levels)

const myMathWhatever = pipe(
  base(`input`),
  add(2),
  detail(`added`),
  subtract(2),
  verbose(`subtracted`),
  base(`output`)
)

myMathWhatever(100)

const [__base, __detail, __verbose] = debug.makeInspectors(__debug, levels)

const liarInspector = (x) => x * 2

const myBizarreInspector = pipe(
  __base(`input`, liarInspector),
  add(2),
  __detail(`added`, liarInspector),
  subtract(2),
  __verbose(`subtracted`, liarInspector),
  __base(`output`, liarInspector)
)

myBizarreInspector(20)
