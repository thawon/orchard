(function () {

    'use strict';

    angular.module('pineappleclub.app-configuration-service', [])
    .factory('AppConfigurationService', AppConfigurationService);

    AppConfigurationService.$inject = [];

    function AppConfigurationService() {
        var configuration = {
            project: {
                name: 'orchard'
            },
            page: {
                titlePrefix: 'Pineapple Club'
            },            
            companyInfo: {
                name: 'orchard'
            },
            progress: {
                color: '#1d9ad9'
            },
            getServiceName: getServiceName,
            breezejs: {
                httpTimeout: 10000
            }
        };

        return configuration;

        function getServiceName(endpoint) {
            return 'api' + endpoint
        }
    }

}());