'use strict';

describe('Unit: LoingController', function () {
    
    var createController, controller, $rootScope, rootScope, $q, AuthServiceMock, UserProfileServiceMock,
        StateServiceMock, UserServiceMock, AUTH_EVENTS, toasterMock;

    beforeEach(module('breeze.angular', 'pineappleclub.login'));

    beforeEach(inject(function (breeze, $controller, _$rootScope_, _$q_, _AUTH_EVENTS_, STRING) {
        $q = _$q_;
        $rootScope = _$rootScope_;

        AUTH_EVENTS = _AUTH_EVENTS_;
        
        StateServiceMock = {
            changeState: function (stateName) { }
        };

        AuthServiceMock = {
            login: function (credentials) { },
            getCurrentUser: function () { },
            isAuthenticated: function () { }
        };

        UserServiceMock = {
            setCurrentUser: function (user) { }
        };
        
        UserProfileServiceMock = {
            getUser: function (id) { }
        };

        toasterMock = {
            pop: function (options) { },
            clear: function (toastId, toasterId) { }
        };

        spyOn(StateServiceMock, "changeState");
        spyOn(UserServiceMock, "setCurrentUser");

        createController = function () {
            return $controller("LoginController", {
                $rootScope: rootScope,              
                AuthService: AuthServiceMock,
                StateService: StateServiceMock,
                UserService: UserServiceMock,
                AUTH_EVENTS: AUTH_EVENTS,
                STRING: STRING,
                UserProfileService: UserProfileServiceMock,
                toaster: toasterMock
            });
        };
    }));

    it("user logins successfully",
    function () {
        var user = {
            _id: 1,
            firstname: "valid first name",
            lastname: 'lastname_valid'
        };
        rootScope = $rootScope.$new();

        spyOn(rootScope, "$broadcast");

        spyOn(AuthServiceMock, "login").andCallFake(function () {
            var deferred = $q.defer();

            deferred.resolve(user);

            return deferred.promise;
        });

        spyOn(UserProfileServiceMock, "getUser").andCallFake(function () {
            var deferred = $q.defer();

            deferred.resolve(user);

            return deferred.promise;
        });

        controller = createController();

        controller.login();

        rootScope.$apply();
                
        expect(UserProfileServiceMock.getUser).toHaveBeenCalledWith(user._id);
        expect(UserServiceMock.setCurrentUser).toHaveBeenCalledWith(user);

        expect(rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.loginSuccess);

        expect(StateServiceMock.changeState).toHaveBeenCalledWith("dashboard");
    });

    it("current user is unable to login",
    function () {
        rootScope = $rootScope.$new();

        spyOn(AuthServiceMock, "login").andCallFake(function (credentials) {
            var deferred = $q.defer();

            rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);

            return deferred.promise;
        });
        
        controller = createController();

        controller.login();

        rootScope.$apply();

        expect(controller.errorMessage).not.toBe(null);
    });

    it("user is authenticated",
    function () {
        spyOn(AuthServiceMock, "isAuthenticated").andCallFake(function () {
            return true;
        });
        
        createController();

        expect(StateServiceMock.changeState).toHaveBeenCalled();
    });

    it("user is not authenticated",
    function () {
        spyOn(AuthServiceMock, "isAuthenticated").andCallFake(function () {
            return false;
        });

        createController();

        expect(StateServiceMock.changeState).not.toHaveBeenCalled();
    });
});