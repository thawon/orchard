(function () {

    'use strict';

    var DEVICE_SIZES = {
        XS: "xs",
        S: "sm",
        M: "md",
        L: "lg"
    };

    angular.module('orchard.device-sizes-constant', [])
    .constant('DEVICE_SIZES', DEVICE_SIZES);

}());