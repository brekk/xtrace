import { sideEffect, taggedSideEffect, scopedSideEffect } from "./index"

test(`sideEffect`, () => {
  sideEffect(a => expect(a).toEqual(`a`), `a`)
})

test(`taggedSideEffect`, () => {
  taggedSideEffect(
    (a, b) => {
      expect(a).toEqual(`a`)
      expect(b).toEqual(`b`)
    },
    `a`,
    `b`
  )
})
test(`scopedSideEffect`, () => {
  scopedSideEffect(
    (a, b) => {
      expect(a).toEqual(`a`)
      expect(b).toEqual(2)
    },
    x => x * 2,
    `a`,
    1
  )
})
