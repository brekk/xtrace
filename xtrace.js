'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var katsuCurry = require('katsu-curry');

var sideEffect = katsuCurry.curry(function (fn, a) {
  fn(a);
  return a;
});
var taggedSideEffect = katsuCurry.curry(function (fn, a, b) {
  fn(a, b);
  return b;
});
var trace = taggedSideEffect(console.log);
var scopedSideEffect = katsuCurry.curry(function (fn, fn2, a, b) {
  fn(a, fn2(b));
  return b;
});
var scopedTrace = scopedSideEffect(console.log);

exports.sideEffect = sideEffect;
exports.taggedSideEffect = taggedSideEffect;
exports.trace = trace;
exports.scopedSideEffect = scopedSideEffect;
exports.scopedTrace = scopedTrace;
