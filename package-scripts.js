const germs = require(`germs`)
const pkg = require(`./package.json`)

const config = germs(pkg.name, {
  readme: `documentation readme -s "API" src/*.js`,
  test: {
    description: `run all tests with coverage`,
    script: [
      `jest src/*.spec.js xtrace.integration.spec.js --coverage`,
      `--coveragePathIgnorePatterns xtrace.js node_modules/common-tags/*`
    ].join(` `)
  }
})

module.exports = config
