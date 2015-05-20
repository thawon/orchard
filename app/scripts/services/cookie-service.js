(function () {

    'use strict';

    angular.module('pineappleclub.cookie-service', [])
    .factory('CookieService', CookieService);

    CookieService.$inject = [];

    function CookieService() {

        var cookieService = {
            getCookie: getCookie,
            setCookie: setCookie,
            removeCookie: removeCookie
        };

        return cookieService;

        function getCookie(name) {
            var cookie = localStorage.getItem(name);

            return (cookie) ? JSON.parse(cookie) : null;
        }

        function setCookie(name, cookie) {
            localStorage.setItem(name, JSON.stringify(cookie));
        }

        function removeCookie(name) {
            localStorage.removeItem(name);
        }

    }

}());