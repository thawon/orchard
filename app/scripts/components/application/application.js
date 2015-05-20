(function () {

    'use strict';

    angular.module('orchard.application', [
        'ngProgress',
        'orchard.app-configuration-service',
        'orchard.auth-service',
        'orchard.user-service',
        'orchard.user-profile-service',
        'orchard.auth-events-constant'
    ])
    .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = [
        '$rootScope',
        'ngProgress',
        'AppConfigurationService',
        'AuthService',
        'UserService',
        'UserProfileService',
        'AUTH_EVENTS'
    ];

    function ApplicationController($rootScope, ngProgress, AppConfigurationService,
        AuthService, UserService, UserProfileService, AUTH_EVENTS) {

        var that = this;
        
        // setting progress bar color
        ngProgress.color(AppConfigurationService.progress.color);

        // check if the user are still logged in from last session.
        AuthService.authenticated()
        .then(function (data) {
            var user;

            if (!data.success)
                return;

            user = data.user;

            // set current user for now so that dashboard can use user-role to verify the page permission
            UserService.setCurrentUser(user);

            // fetch using breezejs manager so the entity is added to the graph            
            UserProfileService.getUser(user._id)
            .then(function (user) {

                // current user is user entity, not a plain javascript object
                UserService.setCurrentUser(user);

                $rootScope.$broadcast(AUTH_EVENTS.authenticated)
            })

        });

    }

}());