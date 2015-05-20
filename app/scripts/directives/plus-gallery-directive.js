(function () {

    'use strict';

    angular.module('pineappleclub.plus-gallery-directive', [])
    .directive('pcdPlusGallery', GalleryPlusDirective);

    GalleryPlusDirective.$inject = [];

    function GalleryPlusDirective(ExportService) {

        var directive = {
            link: function (scope, element, attrs) {
                $(element).attr('data-userid', attrs.userid);

                $(element).plusGallery();
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