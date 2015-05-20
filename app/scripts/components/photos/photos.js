(function () {

    'use strict';

    angular.module('pineappleclub.photos', [
        'pineappleclub.app-configuration-service',
        'pineappleclub.plus-gallery-directive'
    ])
    .controller('PhotosController', PhotosController);

    PhotosController.$inject = [
        'AppConfigurationService'
    ];

    function PhotosController(AppConfigurationService) {

        var that = this;

        that.userId = AppConfigurationService.googlePlusUserId;

    }

}());