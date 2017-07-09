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

#### Similar efforts:

-   `composition-trace` - <https://github.com/stevemao/composition-trace>
