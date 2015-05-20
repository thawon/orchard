'use strict';

describe('Unit: HeaderClientController', function () {

    beforeEach(module('pineappleclub.header-client'));

    var controller, rootScope, timeout, AUTHORISATIONMock, DEVICE_SIZES, ExportServiceMock, UtilServiceMock;

    beforeEach(inject(function ($controller, $rootScope, _$timeout_, _DEVICE_SIZES_) {

        timeout = _$timeout_;
        rootScope = $rootScope.$new();        
        DEVICE_SIZES = _DEVICE_SIZES_;

        var USER_ROLES = {
                admin: 'admin',
                all: '*'
            },
            STATES = {
                otherwise: '/',
                states:
                [
                    {
                        name: 'home',
                        data: {
                            authorizedRoles: [USER_ROLES.all]
                        }
                    },
                    {
                        name: 'login',
                        data: {
                            authorizedRoles: [USER_ROLES.all]
                        }
                    },
                    {
                        name: 'dashboard',
                        data: {
                            authorizedRoles: [USER_ROLES.admin]
                        }
                    }

                ]
            };
        
        AUTHORISATIONMock = {
            USER_ROLES: USER_ROLES,
            STATES: STATES
        };

        ExportServiceMock = {
            addEventListener: function () { }
        };

        UtilServiceMock = {
            device: {
                isBreakpoint: function () { }
            }
        };

        controller = $controller('HeaderClientController', {
            $rootScope: rootScope,
            $timeout: timeout,
            AUTHORISATION: AUTHORISATIONMock,
            DEVICE_SIZES: DEVICE_SIZES,
            ExportService: ExportServiceMock
        });
    }));

    it('header is shown for non-admin page',
    function () {
        var next = {
            name: 'home',
            data: {
                authorizedRoles: [AUTHORISATIONMock.USER_ROLES.all]
            }
        };

        rootScope.$broadcast('$stateChangeSuccess', next);

        expect(controller.isShown).toBe(true);
    });

    it('header is hidden for admin',
    function () {
        var next = {
            name: 'dashboard',
            data: {
                authorizedRoles: [AUTHORISATIONMock.USER_ROLES.admin]
            }
        };

        rootScope.$broadcast('$stateChangeSuccess', next);

        expect(controller.isShown).toBe(false);
    });

    it('header is hidden for login and signout pages',
    function () {
        var next = {
            name: 'login',
            data: {
                authorizedRoles: [AUTHORISATIONMock.USER_ROLES.admin]
            }
        };

        rootScope.$broadcast('$stateChangeSuccess', next);

        expect(controller.isShown).toBe(false);
    });
});