(function () {

    'use strict';

    angular.module('pineappleclub.export-service', [])
    .factory('ExportService', ExportService);

    ExportService.$inject = [];

    function ExportService() {
        return window;
    }

}());