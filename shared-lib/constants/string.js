define(
    ["underscore", "sharedLib/fix-variables"],
    function (_, fix) {
        var STRING = _.extend(fix);

        STRING.set("constants.string",
        {
            empty: ""
        });

        return STRING.get("constants.string");
    });