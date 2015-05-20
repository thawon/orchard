(function () {

    'use strict';

    angular.module('pineappleclub.dashboard', [
        'pineappleclub.authorisation-constant',
        'pineappleclub.view-modes-constant',
        'pineappleclub.user-service'
    ])
    .controller('DashboardController', DashboardController);

    DashboardController.$inject = [
        'AUTHORISATION',
        'VIEW_MODES',
        'UserService'
    ];

    function DashboardController(AUTHORISATION, VIEW_MODES, UserService) {
        var that = this;
        
        that.mode = mode;

        function mode() {
            return 'show';
        }
    }

}());