// Karma configuration
// Generated on Thu Apr 11 2019 22:07:00 GMT+0200 (Central European Summer Time)
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', "karma-typescript"],
        files: [
            'src/**/*.ts',
            'tests/**/*.ts'
        ],
        exclude: [],
        preprocessors: {
            "**/*.ts": "karma-typescript"
        },
        reporters: ['progress', 'karma-typescript'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: false,
        concurrency: Infinity
    })
}
