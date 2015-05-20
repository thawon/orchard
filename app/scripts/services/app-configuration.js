(function () {

    'use strict';

    angular.module('pineappleclub.app-configuration-service', [])
    .factory('AppConfigurationService', AppConfigurationService);

    AppConfigurationService.$inject = [];

    function AppConfigurationService() {
        var configuration = {
            project: {
                name: 'Pineapple Club Website'
            },
            page: {
                titlePrefix: 'Pineapple Club'
            },
            googlePlusUserId: '102015599606810374225',
            companyInfo: {
                name: 'Pineapple Club Family Day Care',
                location: {
                    lat: -33.945967,
                    lng: 151.137092
                },
                contact: {
                    phone: '(02) 8041 8101',
                    mobile: '04 6625 0622',
                    email: 'mui@pineappleclub.com.au'
                }
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