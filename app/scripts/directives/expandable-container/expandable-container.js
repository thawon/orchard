(function () {

    'use strict';

    angular.module('orchard.expandable-container', [])
    .directive('pcdExpandableContainer', ExpandableContainer);

    ExpandableContainer.$inject = [];

    function ExpandableContainer() {

        return {
            restrict: "E",
            transclude: true,
            scope: {},
            link: function (scope, element, attrs) {

                scope.expandable = "/images/collapse.png";
                element.find(".exp-header").html(attrs.header);

                scope.toggle = function () {
                    var $this = $(element),
                        $collapse = $this.find(".collapse-group").find(".collapse");

                    scope.expandable = $collapse.hasClass("collapse in")
                                        ? "/images/expand.png"
                                        : "/images/collapse.png";

                    $collapse.collapse("toggle");
                }
            },
            templateUrl: "scripts/directives/expandable-container/expandable-container.html"
        }

    }

}());