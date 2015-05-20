(function () {

    'use strict';

    angular.module('orchard.util-service', [])
    .factory('UtilService', UtilService);

    UtilService.$inject = [];

    function UtilService() {
        var util = {
                device: {
                    isBreakpoint: isBreakpoint
                },
                defineProperty: defineProperty
            };

        return util;

        function isBreakpoint (size) {
            return $('.device-' + size).is(':visible');
        }

        // Assist in adding an ECMAScript 5 "definedProperty" to a class
        function defineProperty(klass, propertyName, getter, setter) {
            var config = {
                enumerable: true,
                get: getter
            };
            if (setter) {
                config.set = setter;
            }
            Object.defineProperty(klass.prototype, propertyName, config);
        }
    }

}());