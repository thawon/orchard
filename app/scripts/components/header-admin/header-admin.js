(function () {

    'use strict';

    angular.module('pineappleclub.header-admin', [
        'pineappleclub.state-service',
        'pineappleclub.user-service',
        'pineappleclub.auth-service',
        'pineappleclub.auth-events-constant'
    ])
    .controller('HeaderAdminController', HeaderAdminController);

    HeaderAdminController.$inject = [
        '$rootScope',
        'AuthService',
        'StateService',
        'UserService',
        'AUTH_EVENTS'
    ];

    function HeaderAdminController($rootScope, AuthService, StateService,
        UserService, AUTH_EVENTS) {

        var that = this;

        that.getCurrentUser = UserService.getCurrentUser;

        that.logout = function () {
            AuthService.logout()
            .then(function (res) {
                UserService.setCurrentUser(null);

                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

                StateService.changeState("signout");
            });
        }
    }

}());