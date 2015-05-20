(function () {

    'use strict';

    angular.module('pineappleclub.header-client', [
        'pineappleclub.authorisation-constant',
        'pineappleclub.device-sizes-constant',
        'pineappleclub.export-service',
        'pineappleclub.util-service'
    ])
    .controller('HeaderClientController', HeaderClientController);

    HeaderClientController.$inject = [
        '$timeout',
        '$rootScope',
        'AUTHORISATION',
        'DEVICE_SIZES',
        'ExportService',
        'UtilService'
    ];

    function HeaderClientController($timeout, $rootScope,
        AUTHORISATION, DEVICE_SIZES, ExportService, UtilService) {

        var that = this;

        that.configs = {
            IMG_BIGBANNER: "/images/tree-big.png",
            IMG_SMALLBANNER: "/images/tree-small.png"
        };        

        ExportService.addEventListener("resize",
            $.proxy(
                function () {
                    $timeout($.proxy(that.resize, that));
                }, that), false);

        $rootScope.$on("$stateChangeSuccess", function (event, next) {
            var allowedStates = _.filter(AUTHORISATION.STATES.states,
                                    function (state) { return state.name === "login" || state.name === "signout"; });

            that.isShown = (_.find(next.data.authorizedRoles, function (role) { return role === AUTHORISATION.USER_ROLES.admin; })
                                || _.find(allowedStates, function (state) { return state.name === next.name; }))
                                ? false : true;
        });
        
        that.isShown = true;

        resize();

        function resize() {
            that.banner = UtilService.device.isBreakpoint(DEVICE_SIZES.XS) ?
                            that.configs.IMG_SMALLBANNER : that.configs.IMG_BIGBANNER;
        };
    }

}());