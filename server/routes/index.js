define(
    ['express'],
    function (express) {
        return function (app, passport) {
            var home = requirejs('routes/home'),
                user = requirejs('routes/user'),
                saveChanges = requirejs('routes/save-changes'),
                login = requirejs('routes/login')(passport),
                router = express.Router();

            app.use('/api', user);
            app.use('/api', login);
            app.use('/api', saveChanges);

            // home default route must be added last
            app.use('/', home);
        }
    });