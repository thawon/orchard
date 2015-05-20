describe('Unit: AuthService', function () {

    var service, $httpBackend, AUTHORISATION, USER_ROLES, cookieServiceMock;

    beforeEach(module('orchard.authorisation-constant', 'orchard.auth-service',
    function ($provide) {
        cookieServiceMock = {
            getCookie: function (name) { },
            setCookie: function (name, cookie) { },
            removeCookie: function (name) { }
        }

        $provide.value('CookieService', cookieServiceMock);
    }));

    beforeEach(inject(function (AuthService, _$httpBackend_, AUTHORISATION) {
        service = AuthService;
        USER_ROLES = AUTHORISATION.USER_ROLES;

        $httpBackend = _$httpBackend_;
    }));

    it('user logins',
    function () {
        var credentials = {
                email: 'tester@unittest.com.au',
                password: 'password'
            },
            user = {
                id: 1,                
                userRole: 'admin'
            },
            url = 'api/login';

        $httpBackend.when('POST', url)
            .respond({
                success: true,
                user: user
            });

        spyOn(cookieServiceMock, 'setCookie');

        service.login(credentials, function () { });

        $httpBackend.flush();

        $httpBackend.expectPOST(url);
        expect(cookieServiceMock.setCookie).toHaveBeenCalledWith('user', user);
    });

    it('user logout',
    function () {
        var url = 'api/logout';

        $httpBackend.when('POST', url)
            .respond({
                success: true
            });

        spyOn(cookieServiceMock, 'removeCookie');

        service.logout(function () { });

        $httpBackend.flush();

        $httpBackend.expectPOST(url);
        expect(cookieServiceMock.removeCookie).toHaveBeenCalledWith('user');
    });

    it('user is authenticated, checking authentication',
    function () {
        spyOn(cookieServiceMock, 'getCookie').andCallFake(function () {
            return {
                email: 'tester@unittest.com.au',
                password: 'password'
            };
        });

        expect(service.isAuthenticated()).toBe(true);
    });

    it('user is not authenticated, checking authentication',
    function () {
        spyOn(cookieServiceMock, 'getCookie').andCallFake(function () {
            return null;
        });

        expect(service.isAuthenticated()).toBe(false);
    });

    it('get current authenticated user',
    function () {
        spyOn(cookieServiceMock, 'getCookie');

        service.getCurrentUser();

        expect(cookieServiceMock.getCookie).toHaveBeenCalledWith('user');
    });

    it('admin user accesses url which requires admin permission',
    function () {
        var authorizedRoles = [USER_ROLES.admin];

        spyOn(cookieServiceMock, 'getCookie').andCallFake(function () {
            return {
                email: 'tester@unittest.com.au',
                password: 'password',
                userRole: 'admin'
            };
        });

        expect(service.isAuthorized(authorizedRoles)).toBe(true);
    });

    it('parent user accesses url which requires admin permission',
    function () {
        var authorizedRoles = [USER_ROLES.admin];

        spyOn(cookieServiceMock, 'getCookie').andCallFake(function () {
            return {
                email: 'tester@unittest.com.au',
                password: 'password',
                userRole: 'parent'
            };
        });

        expect(service.isAuthorized(authorizedRoles)).toBe(false);
    });
});