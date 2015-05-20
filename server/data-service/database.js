define(
    ['config/config'],
    function (config) {
        var MongoClient = require('mongodb').MongoClient,
            options = {
                server: { auto_reconnect: true }
            },
            database = {
                start: start
            };

        return database;

        function start(cb) {
            MongoClient.connect(config.mongoUrl, options,
                function (err, db) {

                    if (err) {
                        console.error('MongoDb connection failed: ' + err.message);
                        process.exit(1);
                    }

                    database.db = db;

                    cb(db);
                });
        }

    });