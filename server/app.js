define(
    ['config/config', 'dataService/database'],
    function (config, database) {
        var express = require('express'),
            bodyParser = require('body-parser'),
            cookieParser = require('cookie-parser'),
            methodOverride = require('method-override'),
            session = require('express-session'),
            mongoose = require('mongoose'),
            passport = require('passport'),
            MongoStore = require('connect-mongo')(session),
            app = express();

        // configuration ===============================================================
        mongoose.connect(config.mongoUrl); // connect to our database

        require('./config/passport')(passport); // pass passport for configuration

        // express application ==============================================
        // read cookies (needed for auth)
        app.use(cookieParser());
        // get information from html forms
        app.use(bodyParser());

        app.engine(config.express.view.engine.type, config.express.view.engine.driver);
        app.set('view engine', config.express.view.engine.type);
        app.set('views', config.express.view.path);

        app.use(express.static(config.express.staticPath));

        app.use('/shared-lib', express.static(config.express.sharedLibPath));

        database.start(function (db) {
            // required for passport
            app.use(session({
                secret: config.express.secret,
                store: new MongoStore({
                    db: db
                })
            }));
            // session secret
            app.use(passport.initialize());
            // persistent login sessions
            app.use(passport.session());

            // routes ======================================================================
            // load our routes and pass in our app and fully configured passport
            require('routes/index')(app, passport);
        });

        app.listen(config.express.port, function (req, res) {
            console.log('express is listening on http://' +
              config.express.ip + ':' + config.express.port);
        });
    });
