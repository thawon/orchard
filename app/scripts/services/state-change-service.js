(function () {

    'use strict';

    angular.module('pineappleclub.state-change-service', [
        'ngProgress',
        'pineappleclub.state-service',
        'pineappleclub.auth-service',
        'pineappleclub.auth-events-constant',
        'pineappleclub.authorisation-constant'
    ])
    .factory('StateChangeService', StateChangeService);

    StateChangeService.$inject = [
        '$rootScope',
        'AuthService',
        'StateService',
        'AUTH_EVENTS',
        'AUTHORISATION',
        'ngProgress'
    ];

    function StateChangeService($rootScope, AuthService, StateService, 
        AUTH_EVENTS, AUTHORISATION, ngProgress) {

        var stateChangeService = {
            change: change
        };

        return stateChangeService;

        function change(authorizedRoles) {

            if (authorizedRoles[0] === AUTHORISATION.USER_ROLES.all
                || AuthService.isAuthorized(authorizedRoles)) {

                ngProgress.start();

            } else {

                StateService.changeState('login');

                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }

        }

    }

}());