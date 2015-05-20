(function () {

    'use strict';

    angular.module('pineappleclub.contact', [
        'pineappleclub.app-configuration-service',
        'pineappleclub.google-map-directive'
    ])
    .controller('ContactController', ContactController);

    ContactController.$inject = [
        '$location',
        'AppConfigurationService'
    ];

    function ContactController($location, AppConfigurationService) {

        this.location = $location;
        this.companyInfo = AppConfigurationService.companyInfo;

    }

}());