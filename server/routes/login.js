define(
    ['express', 'dataService/database', 'breeze-mongodb'],
    function (express, database, bmongo) {
        return function (passport) {
            var router = express.Router();

            router.post('/login', passport.authenticate('local-login'), function (req, res) {
                return res.send({ success: true, user: req.user });
            });

            router.post('/logout', function (req, res) {
                req.logout();

                return res.send({ success: true });
            })

            router.post('/authenticated', function (req, res) {
                var user = req.user,
                    query;

                if (!user)
                    return res.send({ success: false, user: null });

                query = new bmongo.MongoQuery({
                    // TODO: find out how to create filter object
                    $filter: "_id eq '{0}'".replace('{0}', user._id)
                });

                query.execute(database.db, 'Users',
                    function (err, results) {
                        if (err)
                            res.send(err);
                        
                        return res.send({ success: true, user: results[0] });
                    });
            })

            router.post('/signup', function (req, res, next) {
                passport.authenticate('local-signup', function (err, user, info) {
                    if (err) {
                        // will generate a 500 error
                        return next(err);
                    }

                    // Generate a JSON response reflecting authentication status
                    if (info === 'EMAILEXISTED') {
                        return res.send({ success: false, message: 'Email already exists' });
                    }

                    return res.send({ success: true, user: user });
                })(req, res, next);
            });

            return router;
        }
    });