module.exports = {
  scripts: {
    build: `rollup -c rollup.config.js`,
    test: `jest --verbose`,
    lint: `eslint src/*.js --env jest --fix`,
    doc: `documentation readme -s API src/*.js`,
    care: `nps build test lint doc`
  }
}
