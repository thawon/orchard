(function () {

    'use strict';

    angular.module('pineappleclub.data-service', [
        'pineappleclub.entity-manager-factory'
    ])
    .factory('DataService', DataService);

    DataService.$inject = [
        'EntityManagerFactory'
    ];

    function DataService(EntityManagerFactory) {
        var manager = EntityManagerFactory.getManager(),
            dataService = {                
                saveChanges: saveChanges
            }

        return dataService;

        function saveChanges(fn) {
            return function () {
                return manager.saveChanges();
            }
        }
    }

}());