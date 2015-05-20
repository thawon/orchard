﻿(function () {

    'use strict';

    var VIEW_MODES = {
        show: 'show',
        edit: 'edit',
        create: 'create',
    };

    angular.module('orchard.view-modes-constant', [])
    .constant('VIEW_MODES', VIEW_MODES);

}());