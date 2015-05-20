(function () {

    'use strict';

    angular.module('orchard.data-service', [
        'orchard.entity-manager-factory'
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