define(
    ["underscore", "sharedLib/fix-variables"],
    function (_, fix) {
        var DEVICE_SIZES = _.extend(fix),
            name = "constants.deviceSizes";

        DEVICE_SIZES.set(name,
        {
            XS: "xs",
            S: "sm",
            M: "md",
            L: "lg"
        });

        return DEVICE_SIZES.get(name);
    });