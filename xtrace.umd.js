(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.xtrace = {})));
}(this, (function (exports) { 'use strict';

  var PLACEHOLDER = "🍛";
  var bindInternal3 = function bindInternal3(func, thisContext) {
    return function (a, b, c) {
      return func.call(thisContext, a, b, c);
    };
  };
  var some$1 = function fastSome(subject, fn, thisContext) {
    var length = subject.length,
        iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
        i;
    for (i = 0; i < length; i++) {
      if (iterator(subject[i], i, subject)) {
        return true;
      }
    }
    return false;
  };
  var curry = function curry(fn) {
    var test = function test(x) {
      return x === PLACEHOLDER;
    };
    return function curried() {
      var arguments$1 = arguments;
      var argLength = arguments.length;
      var args = new Array(argLength);
      for (var i = 0; i < argLength; ++i) {
        args[i] = arguments$1[i];
      }
      var countNonPlaceholders = function countNonPlaceholders(toCount) {
        var count = toCount.length;
        while (!test(toCount[count])) {
          count--;
        }
        return count;
      };
      var length = some$1(args, test) ? countNonPlaceholders(args) : args.length;
      function saucy() {
        var arguments$1 = arguments;
        var arg2Length = arguments.length;
        var args2 = new Array(arg2Length);
        for (var j = 0; j < arg2Length; ++j) {
          args2[j] = arguments$1[j];
        }
        return curried.apply(this, args.map(function (y) {
          return test(y) && args2[0] ? args2.shift() : y;
        }).concat(args2));
      }
      return length >= fn.length ? fn.apply(this, args) : saucy;
    };
  };
  var innerpipe = function innerpipe(args) {
    return function (x) {
      var first = args[0];
      var rest = args.slice(1);
      var current = first(x);
      for (var a = 0; a < rest.length; a++) {
        current = rest[a](current);
      }
      return current;
    };
  };
  function pipe() {
    var arguments$1 = arguments;
    var argLength = arguments.length;
    var args = new Array(argLength);
    for (var i = 0; i < argLength; ++i) {
      args[i] = arguments$1[i];
    }
    return innerpipe(args);
  }
  var prop = curry(function (property, o) {
    return o && property && o[property];
  });
  var _keys = Object.keys;
  var keys = _keys;
  var propLength = prop("length");
  var objectLength = pipe(keys, propLength);
  var delegatee = curry(function (method, arg, x) {
    return x[method](arg);
  });
  var filter = delegatee("filter");

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

  exports.sideEffect = sideEffect;
  exports.taggedSideEffect = taggedSideEffect;
  exports.trace = trace;
  exports.scopedSideEffect = scopedSideEffect;
  exports.scopedTrace = scopedTrace;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
