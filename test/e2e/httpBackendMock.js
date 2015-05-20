'use strict';

/* Nodes:
The code that is run in the mockedModule is run in a separate context from the test. One is in the browser, 
one is in the node.js process running the test. https://github.com/angular/protractor/issues/509
*/

var add = function (backendMocks) {
    browser.addMockModule('httpBackendMock', httpBackendMock, backendMocks);
}

var httpBackendMock = function () {
    angular.module('httpBackendMock', ['ngMockE2E'])
        .value('backendMocks', arguments[0])
        .run(function ($httpBackend, backendMocks) {
            var i, mock;

            for (i = 0; i < backendMocks.length; i++) {
                mock = backendMocks[i];

                $httpBackend
                    .when(mock.method, mock.url)
                    .respond(mock.header, mock.response);
            };

        });
};

module.exports.add = add;