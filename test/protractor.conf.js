exports.config = {
    allScriptsTimeout: 11000,

    // This allows you provide a URL to the Selenium Server that Protractor will use to execute tests. 
    // In this case Selenium Server must be previously started to be able to run tests on Protractor.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome'
    },
    
    // A default URL may be passed to Protractor through the baseURL parameter. 
    // That way all calls by Protractor to the browser will use that URL.
    baseUrl: 'http://localhost:3000/',

    onPrepare: function () {

        var htmlMock = function () {
            angular.module('htmlMock', ['ngMockE2E', 'orchard'])
                .run(function ($httpBackend) {
                    $httpBackend.whenGET(/\.html$/).passThrough();
                });
        };

        browser.addMockModule('htmlMock', htmlMock);

    },

    // An array of test files can be sent through the specs parameter for Protractor to execute. 
    // The path of the test files must be relative to the config file.
    specs: ['e2e/*spec.js'],
    
    singleRun: false,

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
}