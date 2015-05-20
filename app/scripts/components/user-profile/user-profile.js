(function () {

    'use strict';

    angular.module('pineappleclub.user-profile', [
        'pineappleclub.entity-detail-container',
        'pineappleclub.expandable-container',
        'pineappleclub.user-profile-service',
        'pineappleclub.data-service',
        'pineappleclub.user-service',
        'pineappleclub.view-modes-constant'
    ])
    .controller('UserProfileController', UserProfileController);

    UserProfileController.$inject = [
        '$stateParams',
        'UserProfileService',
        'DataService',
        'UserService',
        'VIEW_MODES'
    ];

    function UserProfileController($stateParams, UserProfileService, DataService, UserService, VIEW_MODES) {
        var that = this;

        that.user = UserService.getCurrentUser();

        that.save = DataService.saveChanges();

        that.validate = validate;

        that.cancel = cancel;

        that.mode = mode;        

        if (that.mode() === VIEW_MODES.new) {
            // create new entity
        } else {
            // useid to get user entity
        }


        function validate() {
            var user = that.user,
                errors = user.entityAspect.getValidationErrors(),
                result = {
                    hasError: (errors.length > 0) ? true : false,
                    Errors: _.pluck(errors, 'errorMessage')
                };

            return result;
        }

        function cancel() {
            that.user.entityAspect.rejectChanges();
        }

        function mode() {
            return $stateParams.mode;
        }
    }

}());