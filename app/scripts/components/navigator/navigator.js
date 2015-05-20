(function () {

    'use strict';

    angular.module('orchard.navigator', [
        'orchard.app-configuration-service',
        'orchard.authorisation-constant',
        'orchard.auth-events-constant',
        'orchard.auth-service',
        'orchard.user-service',
        'orchard.state-service',
    ])
    .controller('NavigatorController', NavigatorController);

    NavigatorController.$inject = [
        '$rootScope',
        'AppConfigurationService',
        'AUTHORISATION',
        'AUTH_EVENTS',
        'AuthService',
        'UserService',
        'StateService'
    ];

    function NavigatorController($rootScope, AppConfigurationService,
        AUTHORISATION, AUTH_EVENTS, AuthService, UserService, StateService) {

        var that = this,
            states;
        
        that.show = false;

        states = _.filter(AUTHORISATION.STATES.states,
            function (state) {
                return (state.data.authorizedRoles.indexOf(AUTHORISATION.USER_ROLES.admin) !== -1);
            });

        that.states = states;
        that.signout = signout;

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
            that.show = true;
        });

        $rootScope.$on(AUTH_EVENTS.authenticated, function () {
            that.show = true;
        });

        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
            that.show = false;
        });

        function signout() {
            AuthService.logout()
            .then(function (res) {
                UserService.setCurrentUser(null);

                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

                StateService.changeState("signout");
            });
        }
    }

}());