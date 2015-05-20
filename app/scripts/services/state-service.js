(function () {

    'use strict';

    angular.module('pineappleclub.state-service', [
        'pineappleclub.authorisation-constant'
    ])
    .factory('StateService', StateService);

    StateService.$inject = [
        '$location',
        'AUTHORISATION'
    ];

    function StateService($location, AUTHORISATION) {
        var stateService = {
            changeState: changeState
        };

        return stateService;

        function changeState(name) {
            var target = _.first(_.where(AUTHORISATION.STATES.states, { name: name }));

            $location.path(target.url)
        };
    }

}());