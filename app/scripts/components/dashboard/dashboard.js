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
        'VIEW_MODES',
        'ClientService'
    ];

    function DashboardController(VIEW_MODES, ClientService) {
        var that = this;
        
        that.mode = mode;

        function mode() {
            return VIEW_MODES.show;
        }

        that.data = ClientService.getClients();
    }

}());