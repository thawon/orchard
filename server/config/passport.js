﻿define(
    ['models/user'],
    function (User) {
        return function (passport) {
            var LocalStrategy = require('passport-local').Strategy;

            // passport session setup ==================================================
            // required for persistent login sessions
            // passport needs ability to serialize and unserialize users out of session
            // used to serialize the user for the session
            passport.serializeUser(function (user, done) {
                done(null, user.id);
            });

            // used to deserialize the user
            passport.deserializeUser(function (id, done) {
                User.findById(id, function (err, user) {

                    user.lastLoggedInDateTime = new Date();
                    user.save(function (err) {
                        done(err, user);
                    });

                });
            });

            // LOCAL LOGIN ============================================================
            passport.use('local-login', new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                // allows us to pass back the entire request to the callback
                passReqToCallback: true
            },
            function (req, email, password, done) {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'email': email }, function (err, user) {
                    // if there are any errors, return the error before anything else
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, { message: 'User is not found.' });

                    // if the user is found but the password is wrong
                    if (!user.validPassword(password))
                        return done(null, false, { message: 'Password is incorrect.' });

                    user.lastLoggedInDateTime = new Date();

                    user.save(function (err) {
                        if (err)
                            throw err;

                        // all is well, return successful user
                        return done(null, user);
                    });
                });

            }));

            // LOCAL SIGNUP ============================================================
            passport.use('local-signup', new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                // allows us to pass back the entire request to the callback
                passReqToCallback: true
            },
            function (req, email, password, done) {

                // asynchronous
                // User.findOne wont fire unless data is sent back
                process.nextTick(function () {

                    // find a user whose email is the same as the forms email
                    // we are checking to see if the user trying to login already exists
                    User.findOne({ 'email': email }, function (err, user) {
                        // if there are any errors, return the error
                        if (err)
                            return done(err);

                        // check to see if theres already a user with that email
                        if (user) {
                            return done(null, false, { message: 'EMAILEXISTED' });
                        } else {

                            // if there is no user with that email
                            // create the user
                            var newUser = new User();

                            // set the user's local credentials
                            newUser.email = email;
                            newUser.password = newUser.generateHash(password);

                            // save the user
                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }

                    });

                });

            }));

        }
    });