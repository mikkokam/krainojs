module.exports = function(config) {
  config.set({
    autoWatch: false,
    singleRun: true,
    logLevel: config.LOG_INFO,
    frameworks: ['jasmine', 'karma-typescript'],
    files: [{pattern: 'src/**/*.ts'}],
    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },
    karmaTypescriptConfig: {
      tsconfig: 'tsconfig.json',
      compilerOptions: {
        module: 'commonjs'
      }
    },
    reporters: ['progress', 'karma-typescript'],
    browsers: ['Chrome'],
    browserNoActivityTimeout: 30000,
    client: {
      args: ['--grep', config.grep || '']
    }
  });
};