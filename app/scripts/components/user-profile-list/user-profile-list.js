(function () {

    'use strict';

    angular.module('pineappleclub.user-profile-list', [
        'pineappleclub.user-profile-list-service'
    ])
    .controller('UserProfileListController', UserProfileListController);

    UserProfileListController.$inject = [
        'UserProfileListService'
    ];

    function UserProfileListController(UserProfileListService) {
        var that = this;

        that.users = null;
        that.totalUsers = 0;
        // this should match however many results your API puts on one page
        that.usersPerPage = 25;

        getResultsPage(1);

        that.pagination = {
            current: 1
        };

        that.pageChanged = function (newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(pageNumber) {
            UserProfileListService.getUsers('5557c029ce48f30d543cbfc6', pageNumber)
            .then(function (data) {
                that.users = data.results;
                that.totalUsers = data.inlineCount;
            });
        }
    }

}());