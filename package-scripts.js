const germs = require(`germs`)
const pkg = require(`./package.json`)

const config = germs.build(pkg.name, {
  readme: `documentation readme -s "API" src/*.js`,
  test: {
    description: `run all tests with coverage`,
    script: `jest src/*.spec.js xtrace.integration.spec.js --coverage`
  }
})

module.exports = config
