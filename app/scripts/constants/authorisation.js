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
                    name: 'home',
                    display: 'Home',
                    url: '/',
                    templateUrl: 'scripts/components/home/home.html',
                    controller: 'HomeController as home',
                    data: {
                        authorizedRoles: [USER_ROLES.all],
                        page: {
                            title: 'Child Care Service',
                            description: 'We provide high quality child care service supported by Integricare.' +
                                            'The service is operated by experienced diploma qualification educator.'
                        }
                    }
                },
                {
                    name: 'services',
                    display: 'Services',
                    url: '/services',
                    templateUrl: 'scripts/components/services/services.html',
                    data: {
                        authorizedRoles: [USER_ROLES.all],
                        page: {
                            title: 'Family Day Care, Before/After school care, Vocation care',
                            description: 'We provide Family Day Care, Before/After school care and Vocation care.'
                        }
                    }
                },
                {
                    name: 'philosophy',
                    display: 'Philosophy',
                    url: '/philosophy',
                    templateUrl: 'scripts/components/philosophy/philosophy.html',
                    data: {
                        authorizedRoles: [USER_ROLES.all],
                        page: {
                            title: "Unlocking child's full potential",
                            description: "We believe early learning is the key to unlocking a child's full potential."
                        }
                    }
                },
                {
                    name: 'photos',
                    display: 'Photos',
                    url: '/photos',
                    templateUrl: 'scripts/components/photos/photos.html',
                    controller: 'PhotosController as photos',
                    data: {
                        authorizedRoles: [USER_ROLES.all],
                        page: {
                            title: 'Playroom, Creative corner, Art and craft and outside playground',
                            description: 'Our facilities are Playroom, Creative corner, Art and craft and outside playground.'
                        }
                    }
                },
                {
                    name: 'contact',
                    display: 'Contact',
                    url: '/contact',
                    templateUrl: 'scripts/components/contact/contact.html',
                    controller: 'ContactController as contact',
                    data: {
                        authorizedRoles: [USER_ROLES.all],
                        page: {
                            title: 'Near Rockdale and Banksia train station',
                            description: 'Our location is near Rockdale and Banksia train station.'
                        }
                    }
                },
                {
                    name: 'dashboard',
                    display: 'Dashboard',
                    url: '/dashboard',
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
                    name: 'user-profile',
                    display: 'My Profile',
                    url: '/user-profile/:userId?mode',
                    templateUrl: 'scripts/components/user-profile/user-profile.html',
                    controller: 'UserProfileController as userProfile',
                    data: {
                        authorizedRoles: [USER_ROLES.admin],
                        page: {
                            title: 'User Profile Details',
                            description: 'View/Edit user profile'
                        }
                    },
                    icon: '/images/user-profile.png'
                },
                {
                    name: 'user-profile-list',
                    display: 'Users',
                    url: '/user-profile-list',
                    templateUrl: 'scripts/components/user-profile-list/user-profile-list.html',
                    controller: 'UserProfileListController as userProfileList',
                    data: {
                        authorizedRoles: [USER_ROLES.admin],
                        page: {
                            title: 'Users',
                            description: 'List of users'
                        }
                    },
                    icon: '/images/user-profile-list.png'
                }
            ]
    };

    AUTHORISATION = {
        USER_ROLES: USER_ROLES,
        STATES: STATES
    };

    angular.module('pineappleclub.authorisation-constant', [])
    .constant('AUTHORISATION', AUTHORISATION);

}());