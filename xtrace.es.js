import { curry } from 'katsu-curry';

var sideEffect = curry(function (fn, a) {
  fn(a);
  return a;
});
var taggedSideEffect = curry(function (fn, a, b) {
  fn(a, b);
  return b;
});
var trace = taggedSideEffect(console.log);
var scopedSideEffect = curry(function (fn, fn2, a, b) {
  fn(a, fn2(b));
  return b;
});
var scopedTrace = scopedSideEffect(console.log);

export { sideEffect, taggedSideEffect, trace, scopedSideEffect, scopedTrace };
