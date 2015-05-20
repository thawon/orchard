(function () {

    'use strict';

    angular.module('pineappleclub.google-map-directive', [])
    .directive('pcdGoogleMap', GoogleMapDirective);

    GoogleMapDirective.$inject = [
        'AppConfigurationService'
    ];

    function GoogleMapDirective(AppConfigurationService) {

        var directive = {
            link: function (scope, element, attrs) {
                var companyInfo = AppConfigurationService.companyInfo,
                    map, options;

                options = {
                    zoom: 17,
                    center: new google.maps.LatLng(companyInfo.location.lat, companyInfo.location.lng)
                };

                map = new google.maps.Map($(element).get(0), options);
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