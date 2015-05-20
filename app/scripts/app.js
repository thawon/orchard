(function () {

    'use strict';

    angular.module('pineappleclub', [
        'ui.router',
        'breeze.angular',
        'ngResource',
        'ngProgress',
        'ngCookies',
        'toaster',
        'angularUtils.directives.dirPagination',
        'pineappleclub.application',
        'pineappleclub.home',
        'pineappleclub.navigator',
        'pineappleclub.contact',
        'pineappleclub.photos',
        'pineappleclub.header-client',
        'pineappleclub.header-admin',
        'pineappleclub.footer',
        'pineappleclub.side-bar',
        'pineappleclub.dashboard',
        'pineappleclub.login',
        'pineappleclub.user-profile',
        'pineappleclub.user-profile-list',
        'pineappleclub.authorisation-constant',
        'pineappleclub.state-change-service',
        'pineappleclub.auth-interceptor-service'
    ])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider',
        'AUTHORISATION',
    function ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider,
        AUTHORISATION) {

        $locationProvider.html5Mode({
            enabled: true
        });
        
        $urlRouterProvider.otherwise(AUTHORISATION.STATES.otherwise);

        AUTHORISATION.STATES.states.map(function (state) {
            $stateProvider
                .state(state.name, {
                    url: state.url,
                    templateUrl: state.templateUrl,
                    controller: state.controller,
                    data: state.data
                })
        });

        $httpProvider.interceptors.push("AuthInterceptor");
    }])
    .run(['breeze', '$rootScope', 'StateChangeService', 'ngProgress',
    function (breeze, $rootScope, StateChangeService, ngProgress) {

        $rootScope.$on("$stateChangeStart", function (event, next) {
            StateChangeService.change(next.data.authorizedRoles);
        });

        $rootScope.$on("$stateChangeSuccess", function (event, next) {
            ngProgress.complete();
        });

    }]);;

}());