import resolve from "rollup-plugin-node-resolve"
import cjs from "rollup-plugin-commonjs"
import babel from "rollup-plugin-babel"
import cleanup from "rollup-plugin-cleanup"
import json from "rollup-plugin-json"
import progress from "rollup-plugin-progress"
import prepack from "rollup-plugin-prepack"
import pkg from "./package.json"
import camelCase from "camel-case"

const plugins = [
  progress(),
  json(),
  cjs({ extensions: [`.js`], include: `node_modules/**` }),
  babel(),
  resolve({ jsnext: true, main: true }),
  cleanup({ comments: `none` })
]
const external = Object.keys(pkg.dependencies) || []

export default [
  {
    input: `src/index.js`,
    output: {
      name: camelCase(pkg.name),
      file: pkg.browser,
      format: `umd`
    },
    plugins
  },
  {
    input: `src/index.js`,
    external,
    output: [
      { file: pkg.main, format: `cjs` },
      { file: pkg.module, format: `es` }
    ],
    plugins
  }
]
