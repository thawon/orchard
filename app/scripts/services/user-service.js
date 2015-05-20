(function () {

    'use strict';

    angular.module('orchard.user-service', [])
    .factory('UserService', UserService);

    UserService.$inject = [];

    function UserService() {

        // current user stores breeze user entity
        var currentUser,
            userService = {
            getCurrentUser: function () {
                return currentUser;
            },
            setCurrentUser: function (user) {
                currentUser = user;
            }
        }

        return userService;
    }

}());