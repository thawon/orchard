(function () {

    'use strict';

    var DEVICE_SIZES = {
        XS: "xs",
        S: "sm",
        M: "md",
        L: "lg"
    };

    angular.module('pineappleclub.device-sizes-constant', [])
    .constant('DEVICE_SIZES', DEVICE_SIZES);

}());