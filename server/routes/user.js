define(
    ['express', 'dataService/database', 'breeze-mongodb'],
    function (express, database, bmongo) {
        var router = express.Router();

        router.get('/Users', getUser);

        return router;

        function getUser(req, res, next) {
            var query = new bmongo.MongoQuery(req.query);

            query.execute(database.db, 'Users',
                function (err, results) {
                    if (err)
                        res.send(err);

                    res.send(results);
                });
        }
    });