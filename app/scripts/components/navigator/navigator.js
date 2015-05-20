(function () {

    'use strict';

    angular.module('pineappleclub.navigator', [
        'pineappleclub.app-configuration-service',
        'pineappleclub.authorisation-constant'
    ])
    .controller('NavigatorController', NavigatorController);

    NavigatorController.$inject = [
        'AppConfigurationService',
        'AUTHORISATION'
    ];

    function NavigatorController(AppConfigurationService, AUTHORISATION) {
        var that = this,
            states;
        
        states = _.filter(AUTHORISATION.STATES.states,
            function (state) {
                return (state.data.authorizedRoles.indexOf(AUTHORISATION.USER_ROLES.admin) !== -1)
                        && state.name !== 'dashboard';
            });

        that.states = states;                
    }

}());