(function () {

    'use strict';

    angular.module('pineappleclub.application', [
        'ngProgress',
        'pineappleclub.app-configuration-service',
        'pineappleclub.auth-service',
        'pineappleclub.user-service',
        'pineappleclub.user-profile-service'
    ])
    .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = [
        'ngProgress',
        'AppConfigurationService',
        'AuthService',
        'UserService',
        'UserProfileService'
    ];

    function ApplicationController(ngProgress, AppConfigurationService,
        AuthService, UserService, UserProfileService) {

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
            })

        });

    }

}());