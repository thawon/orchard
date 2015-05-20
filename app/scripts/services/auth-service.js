(function () {

    'use strict';    

    angular.module('pineappleclub.auth-service', [
        'pineappleclub.cookie-service',
        'pineappleclub.app-configuration-service'
    ])
    .factory('AuthService', AuthService);

    AuthService.$inject = [
        // Cookie Service is used instead of $cookieStore because it does not work after load the breezejs library        
        'CookieService',
        '$http',
        'AppConfigurationService'
    ];

    function AuthService(CookieService, $http, AppConfigurationService) {

        var authService = {
                login: login,
                logout: logout,
                authenticated: authenticated,
                isAuthenticated: isAuthenticated,
                isAuthorized: isAuthorized,
                getCurrentUser: getCurrentUser
            },
            serviceName = AppConfigurationService.getServiceName;

        return authService;
        
        function setCurrentUser(user) {
            var cookie = {
                id: user.id,
                userRole: user.userRole
            };

            CookieService.setCookie('user', cookie);
        }

        function login(credentials) {
            return $http.post(serviceName('/login'), credentials)
                .then(function (res) {
                    var data = res.data;

                    setCurrentUser(data.user);

                    return data.user;

                });
        };

        function logout() {
            return $http.post(serviceName('/logout'))
                .then(function (res) {
                    var data = res.data;

                    if (data.success) {                        
                        CookieService.removeCookie('user');
                    }

                    return data;
                });
        };

        function authenticated() {

            CookieService.removeCookie('user');
            
            return $http.post(serviceName('/authenticated'))
                .then(function (res) {
                    var data = res.data;

                    if (data.success) {
                        setCurrentUser(data.user);
                    }

                    return data;
                });
        };

        function isAuthenticated() {
            return !!authService.getCurrentUser();
        };

        function isAuthorized(authorizedRoles) {
            var currentUser = authService.getCurrentUser()

            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }

            return (authService.isAuthenticated()
                    && authorizedRoles.indexOf(currentUser.userRole) !== -1);
        };

        function getCurrentUser() {
            return CookieService.getCookie('user');
        }

    }

}());