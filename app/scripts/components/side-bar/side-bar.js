(function () {

    'use strict';

    angular.module('pineappleclub.side-bar', [
        'pineappleclub.device-height-directive',
        'pineappleclub.app-configuration-service',
        'pineappleclub.auth-service',
        'pineappleclub.authorisation-constant',
        'pineappleclub.auth-events-constant'
    ])
    .controller('SideBarController', SideBarController);

    SideBarController.$inject = [
        '$rootScope',
        'AppConfigurationService',
        'AuthService',
        'AUTHORISATION',
        'AUTH_EVENTS'
    ];

    function SideBarController($rootScope, AppConfigurationService, AuthService,
        AUTHORISATION, AUTH_EVENTS) {

        var that = this,
            states;

        that.configs = {
            ELE_SIDEBAR: ".row-offcanvas",
            CONS_ACTIVE: "active",
            CSS_SIDEBARSHOW: "side-bar-show",
            CSS_SIDEBARHIDE: "side-bar-hide"
        };
        
        states = _.filter(AUTHORISATION.STATES.states,
            function (state) {
                return state.name === 'home'
                    || state.name === 'services'
                    || state.name === 'philosophy'
                    || state.name === 'photos'
                    || state.name === 'contact';
            });

        that.dashboardState = _.filter(AUTHORISATION.STATES.states,
            function (state) {
                return state.name === 'dashboard'
            })[0];

        that.project = AppConfigurationService.companyInfo;
        that.states = states;
        that.isShownDashboard = AuthService.isAuthenticated();
        that.toggleSideBar = $.proxy(toggleSideBar, that);

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
            that.isShownDashboard = true;
        });

        $rootScope.$on(AUTH_EVENTS.authenticated, function () {
            that.isShownDashboard = true;
        });

        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
            that.isShownDashboard = false;
        });

        function toggleSideBar() {
            $(that.configs.ELE_SIDEBAR).toggleClass(that.configs.CONS_ACTIVE);
        }        
    }

}());