'use strict';

describe('Unit: ApplicationController', function () {

    beforeEach(module('pineappleclub.application'));

    var createController, rootScope, $q, ngProgressMock, AuthServiceMock,
        UserServiceMock, UserProfileServiceMock;

    beforeEach(inject(function ($controller, $rootScope, _$q_, AppConfigurationService) {
        rootScope = $rootScope;
        $q = _$q_;

        ngProgressMock = {
            color: function (color) { }
        };

        AuthServiceMock = {
            authenticated: function () { },
            getCurrentUser: function () { }
        };

        UserServiceMock = {
            setCurrentUser: function (user) { }
        };

        UserProfileServiceMock = {
            getUser: function (id) { }
        };

        createController = function () {
            return $controller('ApplicationController', {
                ngProgress: ngProgressMock,
                AppConfigurationService: AppConfigurationService,
                AuthService: AuthServiceMock,
                UserService: UserServiceMock,
                UserProfileService: UserProfileServiceMock
            });
        };
        
    }));

    it('check authentication when application starts',
    function () {
        var user = {
                _id: 1
            },
            controller;

        spyOn(AuthServiceMock, 'authenticated').andCallFake(function () {
            var deferred = $q.defer();

            deferred.resolve({ success: true, user: user });

            return deferred.promise;
        });

        spyOn(UserProfileServiceMock, 'getUser').andCallFake(function () {
            var deferred = $q.defer(),
                user = {
                    _id: 1,
                    firstname: "valid first name",
                    lastname: 'lastname_valid'
                };

            deferred.resolve(user);

            return deferred.promise;
        });
        
        controller = createController();

        spyOn(UserServiceMock, 'setCurrentUser');

        rootScope.$apply();

        expect(UserServiceMock.setCurrentUser).toHaveBeenCalledWith(user);
        expect(UserProfileServiceMock.getUser).toHaveBeenCalledWith(user._id);
    });

    it('check authentication when application starts, user is not authenticated',
    function () {
        var controller;

        spyOn(AuthServiceMock, 'authenticated').andCallFake(function () {
            var deferred = $q.defer();

            deferred.resolve({ success: false });

            return deferred.promise;
        });

        controller = createController();

        spyOn(UserServiceMock, 'setCurrentUser');
        spyOn(UserProfileServiceMock, 'getUser');

        rootScope.$apply();

        expect(UserServiceMock.setCurrentUser).not.toHaveBeenCalled();
        expect(UserProfileServiceMock.getUser).not.toHaveBeenCalled();
    });
});