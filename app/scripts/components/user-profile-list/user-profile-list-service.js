(function () {

    'use strict';

    angular.module('pineappleclub.user-profile-list-service', [
        'pineappleclub.entity-manager-factory'
    ])
    .factory('UserProfileListService', UserProfileListService);

    UserProfileListService.$inject = [
        'EntityManagerFactory'        
    ];

    function UserProfileListService(EntityManagerFactory, UserService) {
        var manager = EntityManagerFactory.getManager(),
            userProfileListService = {
                getUsers: getUsers
            }

        return userProfileListService;

        function getUsers(accountId, pageNumber) {
            var query = breeze.EntityQuery.from('Users')
                        .where('account_id', '==', accountId)
                        .skip(2 * (pageNumber - 1))
                        .take(2)
                        .inlineCount();

            return manager.executeQuery(query)
                .then(function (data) {
                    return data;
                })
                .catch(function (error) {
                    console.log(error)
                });

        }

    }

}());