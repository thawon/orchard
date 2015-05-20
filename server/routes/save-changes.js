define(
    ['express', 'dataService/database', 'breeze-mongodb'],
    function (express, database, bmongo) {
        var router = express.Router();

        router.post('/SaveChanges', saveChanges);

        return router;
        
        function saveChanges(req, res, next) {
            var saveProcessor = new bmongo.MongoSaveHandler(database.db, req.body,
                function (err, results) {
                    if (err) {
                        next(err);
                    } else {
                        // Prevent browser from caching results of API data requests
                        res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                        res.setHeader('Content-Type:', 'application/json');
                        res.json(results);
                    }
                });

            saveProcessor.save();
        }
    });