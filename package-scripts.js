module.exports = {
  scripts: {
    dependencies: `depcheck`,
    graph: [
      `madge src --json | jayin "_.toPairs(x).map(([k, v]) => (`,
      `[k,_.map(v, (y) => (`,
      `y.indexOf('node_modules') > -1 ?`,
      `y.substr(y.indexOf('node_modules') + 13) : y))`,
      `])).map(([k, v]) => (`,
      `[k.replace('/', '/\n'),`,
      `_.map(v, (y) => (y.replace('/', '/\n')))`,
      `])).filter(([k, v]) => !(k.indexOf('spec') > -1))`,
      `.filter(([k, v]) => !(k.indexOf('css') > -1))`,
      `.filter(([k, v]) => !(k.indexOf('fixture') > -1))`,
      `.reduce((agg, [k, v]) => Object.assign({}, agg, {[k]: v}), {})"`,
      ` | madge --stdin --image dependencies.svg`
    ].join(``),
    readme: `documentation readme README.md -s "API" src/index.js`,
    docs: `documentation build src/index.js -f html -o docs`,
    lint: {
      default: `nps "lint.src npm run lint:jsdoc"`,
      src: `eslint src/*.js`,
      jsdoc: `documentation lint src/index.js`
    },
    test: {
      default: `nyc ava src/*.spec.js *.spec.js`,
      ava: `ava src/*.spec.js *.spec.js`
    },
    build: {
      default: `nps build.main`,
      main: `rollup -c config/rollup.config.main.js`
    },
    care: `nps lint && nps test && nps build && nps readme`
  }
}
