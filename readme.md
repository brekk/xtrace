![xtrace](https://cdn.rawgit.com/brekk/xtrace/554215b/logo.svg)

> a tool for adding clarity to your compositional-pipelines or just invoking side-effects in a clean way

Originally inspired by [this book](https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html#debugging), this is a more fully-fledged solution for adding simple side-effects to a given operation.

```js
import R from 'ramda'

const multiply = R.curry((a, b) => a * b)

const iterateOverEveryElementAndMultiplyBy5 = R.map(multiply(5))
console.log(iterateOverEveryElementAndMultiplyBy5([1,2,3,4,5])) // 5, 10, 15, 20, 25
```

What can we do if we wanna make this function easy to inspect as it iterates over these values?

```js
import {trace} from 'xtrace'

const iterateOverEveryElementAndMultiplyBy5WithLogging = R.pipe(
  trace(`input!`),
  R.map(
    R.pipe(
      trace(`5 *`),
      multiply(5)
    )
  ),
  trace(`output!`)
)
```

What about conditional logging? Here's an example using `debug`

```js
import Debug from 'debug'
import {xtrace} from 'xtrace'
const debug = Debug(`my-debug-logger`)
const dtrace = xtrace(debug)

const verboseConditionalLoggerWhenMultiplyingBy5 = R.pipe(
  dtrace(`input!`),
  R.map(
    R.pipe(
      dtrace(`5 *`),
      multiply(5)
    )
  ),
  dtrace(`output!`)
)
```

Or, for convenience, just use the exported `debug` object (added `0.1.0`):

```js
import {debug} from 'xtrace'
const [trace, extra, wordVomit] = debug.makeLoggers([`log:critical`, `log:info`,`log:verbose`])

const reallyCerboseConditionalLoggerWhenMultiplyingBy5 = R.pipe(
  extra(`input!`),
  R.map(
    R.pipe(
      wordVomit(`5 *`),
      multiply(5)
    )
  ),
  extra(`output!`)
)
```

#### API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

###### Table of Contents

-   [debug.makeInspectors](#debugmakeinspectors)
-   [debug.makeLoggers](#debugmakeloggers)
-   [sideEffect](#sideeffect)
-   [trace](#trace)
-   [xtrace](#xtrace)

##### debug.makeInspectors

makeInspectors with debug

**Parameters**

-   `bug` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** a debugging function, ostensibly
-   `logList` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;strings>** a list of strings

**Examples**

```javascript
import bug from 'debug'
import {debug} from 'xtrace'
const [base, detail, verbose] = debug.makeInspectors(bug, [`mylib:0`, `mylib:1`, `mylib:2`])
base(`a`, (x) => JSON.stringify(x, null, 2), {data: `cool`})
```

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;functions>** inspector functions

##### debug.makeLoggers

makeLoggers with debug

**Parameters**

-   `bug` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** a debugging function, ostensibly
-   `logList` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;strings>** a list of strings

**Examples**

```javascript
import bug from 'debug'
import {debug} from 'xtrace'
const [base, detail, verbose] = debug.makeInspectors(bug, [`mylib:0`, `mylib:1`, `mylib:2`])
base(`a`, {data: `cool`})
```

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;functions>** inspector functions

##### sideEffect

The high-level abstraction for identity-closure side-effects

**Parameters**

-   `effect` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function which does something independent of the returned value
-   `tag` **any** first value to pass to the side effect
-   `inspect` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function which wraps the second value to pass to the side effect
-   `input` **any** the return value, and the value passed to the inspect function

**Examples**

```javascript
import {sideEffect} from 'xtrace'
const effect = console.log
const tag = `item moved!`
const inspect = ({name: x, y}) => `${name} - [${x}, ${y}]`
const input = {
  name: `pseudo:event:name`,
  x: 1,
  y: 2
}
// running it straight like this, there's less utility:
sideEffect(effect, tag, inspect, input) // prints: item moved! pseudo:event:name - [1, 2]
// but if we imagine it as part of a composed function pipeline
// pipe(
//   moveLeft, // (ostensibly this would move the element to the left)
//   sideEffect(effect, tag, inspect) // it becomes more useful as a reusable logger
// )
```

Returns **any** whatever input is

##### trace

trace is the same as xtrace, only we applied the first parameter as console.log, for convenience

**Parameters**

-   `tag` **any** first value to pass to the console.log
-   `input` **any** the return value, and the value passed to the console.log

**Examples**

```javascript
import {trace} from 'xtrace'
const tag = `item moved!`
const input = `pseudo:event:name`
// running it straight like this, there's less utility:
trace(tag, input) // prints: item moved! pseudo:event:name
// but if we imagine it as part of a composed function pipeline
// pipe(
//   moveLeft, // (ostensibly this would move the element to the left)
//   trace(`moved left`) // it becomes more useful as a reusable logger
// )
```

Returns **any** whatever input is

##### xtrace

xtrace is the same as sideEffect, only we drop the inspect parameter by passing identity

**Parameters**

-   `effect` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** function which does something independent of the returned value
-   `tag` **any** first value to pass to the side effect
-   `input` **any** the return value, and the value passed to the side effect

**Examples**

```javascript
import {xtrace} from 'xtrace'
const effect = console.log
const tag = `item moved!`
const input = `pseudo:event:name`
// running it straight like this, there's less utility:
xtrace(effect, tag, input) // prints: item moved! pseudo:event:name
// but if we imagine it as part of a composed function pipeline
// pipe(
//   moveLeft, // (ostensibly this would move the element to the left)
//   sideEffect(effect, tag) // it becomes more useful as a reusable logger
// )
```

Returns **any** whatever input is

#### Similar efforts:

-   `composition-trace` - <https://github.com/stevemao/composition-trace>