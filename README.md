                  _
            __  _| |_ _ __ __ _  ___ ___
            \ \/ / __| '__/ _` |/ __/ _ \
             >  <| |_| | | (_| | (_|  __/
            /_/\_\\__|_|  \__,_|\___\___|

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

#### API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

##### sideEffect

The high-level abstraction for identity-closure side-effects

**Parameters**

-   `effect` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function which does something independent of the returned value
-   `tag` **any** first value to pass to the side effect
-   `inspect` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function which wraps the second value to pass to the side effect
-   `input` **any** the return value, and the value passed to the inspect function

**Examples**

```javascript
import {sideEffect, $, I} from 'xtrace'
import _debug from 'debug'
const debug = _debug(`my:custom:debugger`)
const trace = sideEffect(debug, $, I, $)
// [...]
trace(`input`, 5) // only logs if DEBUG env var (e.g. DEBUG=my:custom:debugger node this-file.js)
```

Returns **any** whatever input is

##### xtrace

xtrace is the same as sideEffect, only we dropped the inspect parameter by passing identity

**Parameters**

-   `effect` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function which does something independent of the returned value
-   `tag` **any** first value to pass to the side effect
-   `input` **any** the return value, and the value passed to the side effect

**Examples**

```javascript
import {xtrace} from 'xtrace'
import _debug from 'debug'
const debug = _debug(`my:custom:debugger`)
const trace = xtrace(debug)
// [...]
trace(`input`, 5) // only logs if DEBUG env var (e.g. DEBUG=my:custom:debugger node this-file.js)
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
trace(`whatever`, 5) // logs 'whatever', 5
```

Returns **any** whatever input is

#### Similar efforts:

-   `composition-trace` - <https://github.com/stevemao/composition-trace>
