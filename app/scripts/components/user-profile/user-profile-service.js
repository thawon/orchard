﻿(function () {

    'use strict';

    angular.module('orchard.user-profile-service', [
        'orchard.entity-manager-factory'
    ])
    .factory('UserProfileService', UserProfileService);

    UserProfileService.$inject = [
        'EntityManagerFactory'        
    ];

    function UserProfileService(EntityManagerFactory, UserService) {
        var manager = EntityManagerFactory.getManager(),
            userProfileService = {
                getUser: getUser
            }

        return userProfileService;

        function getUser(id) {
            return manager.fetchEntityByKey('User', id)
                .then(function (data) {
                    return data.entity;
                })
                .catch(function (error) {
                    console.log(error)
                });

        }

    }

}());