(function () {

    'use strict';

    angular.module('pineappleclub.footer', [
        'pineappleclub.authorisation-constant'
    ])
    .controller('FooterController', FooterController);

    FooterController.$inject = [
        'AUTHORISATION'
    ];

    function FooterController(AUTHORISATION) {
        var that = this,
            states;

        states = _.filter(AUTHORISATION.STATES.states,
            function (state) {
                return state.name === 'philosophy'
                    || state.name === 'contact';
            });


        that.states = states;
    }

}());