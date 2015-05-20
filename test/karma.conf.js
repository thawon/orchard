// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-08-31 using
// generator-karma 0.8.3

module.exports = function(config) {
  "use strict";

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: "../",

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser / MUST be loaded in order
    files: [
        "app/scripts/vendors/jquery.js",
        "app/scripts/vendors/underscore-min.js",
        "app/scripts/vendors/angular.min.js",
        "app/scripts/vendors/angular-mocks.js",
        "app/scripts/vendors/angular-cookies.min.js",
        "app/scripts/vendors/angular-resource.min.js",
        "app/scripts/vendors/ngProgress.min.js",
        "app/scripts/vendors/toaster.js",

        "app/scripts/vendors/breeze.debug.js",
        "app/scripts/vendors/breeze.dataService.mongo.js",
        "app/scripts/vendors/breeze.bridge.angular.js",
        "app/scripts/vendors/breeze.metadata-helper.js",
        "app/scripts/vendors/breeze.saveErrorExtensions.js",
        
        "app/scripts/*.js",
        "app/scripts/components/**/*.js",
        "app/scripts/services/**/*.js",
        "app/scripts/constants/*.js",
        
        "test/specs/**/*.js",
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8082,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
        //"PhantomJS"
        "Chrome"
    ],

    // Which plugins to enable
    plugins: [
        "karma-phantomjs-launcher",
        "karma-chrome-launcher",
        "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO
  });
};
