describe('Unit: StateChangeService', function () {

    var service, $rootScope, ngProgress, stateServiceMock, authServiceMock, USER_ROLES;
    
    beforeEach(module('orchard.authorisation-constant', 'orchard.state-change-service',
    function ($provide) {
        stateServiceMock = {
            changeState: function (stateName) { }
        }

        authServiceMock = {
            isAuthenticated: function () { },
            isAuthorized: function (authorizedRoles) { }
        }

        $provide.value('StateService', stateServiceMock);
        $provide.value('AuthService', authServiceMock);
    }));

    beforeEach(inject(function (StateChangeService, _$rootScope_, _ngProgress_, AUTHORISATION) {
        service = StateChangeService;

        USER_ROLES = AUTHORISATION.USER_ROLES;

        $rootScope = _$rootScope_;
        ngProgress = _ngProgress_;

        spyOn(stateServiceMock, 'changeState');
    }));

    it('page does not require authorisation',
    function () {
        var authorizedRoles = [USER_ROLES.all];

        spyOn(ngProgress, 'start');

        service.change(authorizedRoles);

        expect(ngProgress.start).toHaveBeenCalled();
        expect(stateServiceMock.changeState).not.toHaveBeenCalledWith('login');
    });

    it('user is authorised for page',
    function () {
        var authorizedRoles = [USER_ROLES.admin];

        spyOn(ngProgress, 'start');

        spyOn(authServiceMock, 'isAuthorized').andCallFake(function () {
            return true;
        });

        service.change(authorizedRoles);

        expect(ngProgress.start).toHaveBeenCalled();

        expect(stateServiceMock.changeState).not.toHaveBeenCalledWith('login');
    });

    it('user is not authorised for page',
    function () {
        var authorizedRoles = [USER_ROLES.admin];

        spyOn(authServiceMock, 'isAuthorized').andCallFake(function () {
            return false;
        });

        service.change(authorizedRoles);        

        expect(stateServiceMock.changeState).toHaveBeenCalledWith('login');
    });
});