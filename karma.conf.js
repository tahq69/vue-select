// Karma configuration
// Generated on Thu Nov 30 2017 20:36:16 GMT+0200 (FLE Standard Time)

var webpackConfig = require("./webpack.config.js")

module.exports = function(config) {
  config.set({
    // Paths
    basePath: "",
    exclude: [],
    files: [{ pattern: "src/**/*.spec.ts", watch: false }],

    // Module processing
    preprocessors: {
      // Process all *spec* modules with webpack
      // (it will handle dependencies)
      "src/**/*.spec.ts": ["webpack", "sourcemap"],
    },
    // Targets
    browsers: ["PhantomJS"],
    // Reporters
    reporters: ["dots"],
    logLevel: config.LOG_INFO,
    colors: true,
    // Test framework configuration
    frameworks: ['jasmine'],
    // Runner configuration
    port: 9876,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity,
    // Webpack config
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: "errors-only",
    },
  })
}
