var requirejs = require("requirejs");

requirejs.config({

    nodeRequire: require,

    baseUrl: "./",

    paths: {
        app: "server/app",

        dataService: "server/data-service",

        config: "server/config",

        models: "server/models",

        routes: "server/routes",

        util: "server/util",

        authentication: "server/authentication",

        sharedLib: "shared-lib",

        constants: "shared-lib/constants"
    }
});

requirejs(["app"],
    function (app) { }
);