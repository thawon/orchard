(function () {

    'use strict';

    angular.module('pineappleclub.dashboard', [
        'pineappleclub.authorisation-constant',
        'pineappleclub.view-modes-constant',
        'pineappleclub.user-service'
    ])
    .controller('DashboardController', DashboardController);

    DashboardController.$inject = [
        'AUTHORISATION',
        'VIEW_MODES',
        'UserService'
    ];

    function DashboardController(AUTHORISATION, VIEW_MODES, UserService) {
        var that = this,
            states, userProfileState, userProfilestateParams;

        that.currentUser = UserService.getCurrentUser();

        states = _.filter(AUTHORISATION.STATES.states,
            function (state) {
                return (state.data.authorizedRoles.indexOf(that.currentUser.userRole) !== -1)
                        && state.name !== 'dashboard'
                        && state.name !== 'user-profile';
            });

        userProfileState = _.clone(_.first(_.filter(AUTHORISATION.STATES.states,
            function (state) {
                return (state.name == 'user-profile');
            })));
        
        states.unshift(userProfileState);

        userProfilestateParams = {
            userId: that.currentUser._id,
            mode: VIEW_MODES.show
        };
        userProfileState.name += '(' + JSON.stringify(userProfilestateParams) + ')';

        that.states = states;
    }

}());