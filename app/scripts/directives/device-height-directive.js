(function () {

    'use strict';

    angular.module('pineappleclub.device-height-directive', [
        'pineappleclub.export-service'
    ])
    .directive('pcdDeviceHeight', DeviceHeightDirective);

    DeviceHeightDirective.$inject = [
        'ExportService'
    ];

    function DeviceHeightDirective(ExportService) {

        var directive = {
            link: function (scope, element, attrs) {
                $(element).height($(ExportService).height());
            }
        }

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                directive.link(scope, element, attrs);
            }
        }

    }

}());