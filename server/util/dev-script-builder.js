define(
    ['underscore', 'path', 'config/config'],
    function (_, path, config) {
        var scripts = [],
            builder = {
                build: getScripts
            };

        return builder;

        function getScripts(dir, excludeDirs, excludeFiles) {

            var fs = require('fs'),
                content = fs.readdirSync(dir),
                files = getFiles(content),
                dirs = getDirs(content);

            // exclude unwanted files and directories
            files = _.difference(files, excludeFiles);
            dirs = _.difference(dirs, excludeDirs);

            files.forEach(function (name) {
                var fileName = dir.replace(config.express.staticPath + '/', '') + '/' + name;

                if (scripts.indexOf(fileName) === -1) {
                    scripts.push(fileName);
                }
            });

            dirs.forEach(function (name) {
                return getScripts(dir + '/' + name, excludeDirs, excludeFiles)
            });

            return scripts;
        }

        function getDirs(list) {
            return _.filter(list, function (name) { return (name.indexOf('.') === -1) });
        }

        function getFiles(list) {
            return _.filter(list, function (name) { return (name.indexOf('.js') !== -1) });
        }
    });