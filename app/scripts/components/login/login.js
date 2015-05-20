(function () {

    'use strict';

    angular.module('orchard.login', [
        'orchard.auth-service',
        'orchard.state-service',
        'orchard.user-service',
        'orchard.auth-events-constant',
        'orchard.string-constant',
        'orchard.user-profile-service'
    ])
        .controller('LoginController', LoginController);

    LoginController.$inject = [
        '$rootScope', 
        'AuthService',
        'StateService',
        'UserService',
        'AUTH_EVENTS',
        'STRING',
        'UserProfileService',
        'toaster'
    ];

    function LoginController($rootScope, AuthService, StateService,
        UserService, AUTH_EVENTS, STRING, UserProfileService, toaster) {
        
        var that = this,
            waitToastId = 'waitingId',
            successtoasterOptions = {
                type: 'success',
                body: 'logged in successfully',
                timeout: 2000
            },
            waitToasterOptions = {
                type: 'wait',
                body: 'logging in...',
                toastId: waitToastId,
                toasterId: waitToastId
            },
            errorToasterOptions = {
                type: 'error',
                body: 'logged in unsuccessfully'
            };

        that.credentials = {
            email: STRING.empty,
            password: STRING.empty
        };

        that.errorMessage = null;

        that.login = function (credentials) {

            AuthService.login(credentials)
            .then(function (user) {

                toaster.pop(waitToasterOptions);

                // current user is user entity, not a plain javascript object
                UserService.setCurrentUser(user);

                // fetch using breezejs manager so the entity is added to the graph            
                UserProfileService.getUser(user._id)
                .then(function (user) {

                    toaster.clear(waitToastId, waitToastId);

                    // current user is user entity, not a plain javascript object
                    UserService.setCurrentUser(user);

                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

                    goDashboard();

                    toaster.pop(successtoasterOptions);
                })
                
            });
        }

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
            toaster.clear(waitToastId, waitToastId);

            toaster.pop(errorToasterOptions);

            that.errorMessage = 'The email or password you entered is incorrect.';
        });

        if (AuthService.isAuthenticated()) {
            // use has signed in, redirect to home page
            goDashboard();
        }

        function goDashboard() {
            StateService.changeState('dashboard');
        }
    }

}());