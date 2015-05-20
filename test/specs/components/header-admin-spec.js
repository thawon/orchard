'use strict';

describe('Unit: HeaderAdminController', function () {

    beforeEach(module('pineappleclub.header-admin'));

    var controller, rootScope, $q, AuthServiceMock, StateServiceMock, UserServiceMock, AUTH_EVENTS;

    beforeEach(inject(function ($controller, $rootScope, _$q_, _AUTH_EVENTS_) {

        $q = _$q_;
        AUTH_EVENTS = _AUTH_EVENTS_;

        rootScope = $rootScope.$new();
        
        AuthServiceMock = {
            logout: function () { }
        };

        StateServiceMock = {
            changeState: function (stateName) { }
        };

        UserServiceMock = {
            setCurrentUser: function (user) { }
        };

        
        spyOn(rootScope, '$broadcast');
        spyOn(StateServiceMock, 'changeState');
        spyOn(UserServiceMock, 'setCurrentUser');

        controller = $controller('HeaderAdminController', {
            $rootScope: rootScope,            
            AuthService: AuthServiceMock,
            StateService: StateServiceMock,
            UserService: UserServiceMock
        });
    }));

    it('current user is cleared after a successful logout',
    function () {
        spyOn(AuthServiceMock, 'logout').andCallFake(function () {
            var deferred = $q.defer();

            deferred.resolve({ success: true });

            return deferred.promise;
        });

        controller.logout();

        // Propagate promise to 'then' functions using $apply().
        rootScope.$apply();

        expect(UserServiceMock.setCurrentUser).toHaveBeenCalledWith(null);
        expect(rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.logoutSuccess);

        expect(StateServiceMock.changeState).toHaveBeenCalledWith('signout');
    });
});