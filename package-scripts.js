const germs = require(`germs`)
const pkg = require(`./package.json`)
const utils = require(`nps-utils`)
const allNPS = utils.concurrent.nps

const config = germs.build(pkg.name, {
  readme: `documentation readme -s "API" src/*.js`,
  test: {
    description: `run all tests with coverage`,
    script: `jest --coverage`
  }
})

config.scripts.lint.project = `clinton`
config.scripts.lint = Object.assign(
  {},
  config.scripts.lint,
  {script: allNPS(`lint.src`, `lint.jsdoc`, `lint.project`)}
)

module.exports = config
