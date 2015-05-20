(function () {

    'use strict';
    var USER_ROLES, STATES, AUTHORISATION;

    USER_ROLES = {
        admin: 'admin',
        all: '*'
    };

    STATES = {
        otherwise: '/',
        states:
            [
                {
                    name: 'dashboard',
                    display: 'Dashboard',
                    url: '/',
                    templateUrl: 'scripts/components/dashboard/dashboard.html',
                    controller: 'DashboardController as dashboard',
                    data: {
                        authorizedRoles: [USER_ROLES.admin],
                        page: {
                            title: 'Admin Dashboard',
                            description: ''
                        }
                    }
                },
                {
                    name: 'login',
                    url: '/login',
                    templateUrl: 'scripts/components/login/login.html',
                    controller: 'LoginController as login',
                    data: {
                        authorizedRoles: [USER_ROLES.all],
                        page: {
                            title: 'Login',
                            description: 'admin user authentication'
                        }
                    }
                },
                {
                    name: 'signout',
                    url: '/signout',
                    templateUrl: 'scripts/components/signout/signout.html',
                    data: {
                        authorizedRoles: [USER_ROLES.all],
                        page: {
                            title: 'Signout',
                            description: 'User is signed out'
                        }
                    }
                },
                {
                    name: 'intranet',
                    display: 'Intranet',
                    url: '/intranet',
                    templateUrl: 'scripts/components/intranet/intranet.html',
                    data: {
                        authorizedRoles: [USER_ROLES.admin],
                        page: {
                            title: 'Signout',
                            description: 'User is signed out'
                        }
                    }
                },
                {
                    name: 'project-admin',
                    display: 'Project Admin',
                    url: '/project-admin',
                    templateUrl: 'scripts/components/intranet/intranet.html',
                    data: {
                        authorizedRoles: [USER_ROLES.admin],
                        page: {
                            title: 'Signout',
                            description: 'User is signed out'
                        }
                    }
                }
            ]
    };

    AUTHORISATION = {
        USER_ROLES: USER_ROLES,
        STATES: STATES
    };

    angular.module('orchard.authorisation-constant', [])
    .constant('AUTHORISATION', AUTHORISATION);

}());