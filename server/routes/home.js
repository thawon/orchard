define(
    ['express', 'config/config', 'util/dev-script-builder'],
    function (express, config, builder) {
        var router = express.Router();

        // catch all route for history
        router.get('*', function (req, res) {
            var scripts = ['scripts/pc.min.js'],
                dir = config.express.staticPath + '/scripts',
                excludeDirs = [
                    'vendors'
                ],
                excludeFiles = [
                    'pc.js',
                    'pc.min.js'
                ];

            if (!process.env.NODE_ENV) {
                scripts = builder.build(dir, excludeDirs, excludeFiles)
            }

            res.render('index', { scripts: scripts });
        });

        return router;

    });