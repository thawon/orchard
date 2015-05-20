define(
    ['module', 'path', 'consolidate'],
    function (module, path, consolidate) {
        var config = {},
            dirname = path.normalize(path.dirname(module.uri)),
            mongoUrl;

        console.log('env: ' + process.env.NODE_ENV);

        config.basePath = path.normalize(dirname + '/../..');
        
        config.express = {
            port: process.env.port || 3000,
            ip: '127.0.0.1',
            key: 'connect.sid',
            secret: 'orchard_secret',
            view: {
                path: config.basePath + '/server/views',
                engine: {
                    type: 'jade',
                    driver: consolidate.jade
                }
            },

            // base directory 
            staticPath: config.basePath + '/app',

            // shared libraries
            sharedLibPath: config.basePath + '/shared-lib'
        };

        // production connection string
        mongoUrl = 'mongodb://console:zzKBugqlYUaCJRsRP9b.KzkxAxWuQJ_DyCClmRKoUmI-@ds041167.mongolab.com:41167/console';

        if (!process.env.NODE_ENV) {

            // development connection string
            mongoUrl = 'mongodb://localhost:27017/console';

        } else if (process.env.NODE_ENV === 'test') {

            // e2e connection string
            mongoUrl = 'mongodb://localhost:27017/console_test';

        }

        console.log('mongo url: ' + mongoUrl);

        config.mongoUrl = mongoUrl;

        return config;
    });