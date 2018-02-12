const pkg = require(`./package.json`)

module.exports = function configureWallaby(wallaby) {
  return {
    name: pkg.name,
    debug: true,
    files: [
      `src/*.js`,
      `!src/*.spec.js`
    ],

    tests: [
      `src/*.spec.js`
    ],

    env: {
      type: `node`,
      runner: `node`
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    testFramework: `jest`
  }
}
