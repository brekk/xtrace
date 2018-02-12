const germs = require(`germs`)
const pkg = require(`./package.json`)

const config = germs.build(pkg.name, {
  readme: `documentation readme -s "API" src/*.js`,
  test: {
    description: `run all tests with coverage`,
    script: `jest --coverage`
  }
})

module.exports = config
