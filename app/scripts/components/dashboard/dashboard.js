(function () {

    'use strict';

    angular.module('orchard.dashboard', [
        'orchard.view-modes-constant',
        'orchard.client-service',
        'orchard.entity-detail-container',
        'orchard.expandable-container',
    ])
    .controller('DashboardController', DashboardController);

    DashboardController.$inject = [
        '$q',
        'VIEW_MODES',
        'ClientService'
    ];

    function DashboardController($q, VIEW_MODES, ClientService) {
        var that = this;
        
        that.mode = mode;

        that.validate = validate;

        that.cancel = cancel;

        that.save = save;;

        function mode() {
            return VIEW_MODES.show;
        }

        function validate() {
            var errors = [],
                result = {
                    hasError: (errors.length > 0) ? true : false,
                    Errors: _.pluck(errors, 'errorMessage')
                };

            return result;
        }

        function cancel() { }

        function save() {
            var deferred = $q.defer();

            deferred.resolve(null);

            return deferred.promise;
        }

        that.data = ClientService.getClients();
    }

}());