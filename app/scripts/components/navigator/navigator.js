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
                return state.name === 'home'
                    || state.name === 'services'
                    || state.name === 'philosophy'
                    || state.name === 'photos'
                    || state.name === 'contact';
            });

        that.companyInfo = AppConfigurationService.companyInfo;
        that.states = states;
        
        that.toggleSideBar = function () {
            $('.row-offcanvas').toggleClass('active');
        }
    }

}());