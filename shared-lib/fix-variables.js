define(
    ["underscore"],
    function (_) {
        var fix = (
            function () {
                var constants = {},
                    ownProp = Object.prototype.hasOwnProperty,
                    allowed = {
                        string: 1,
                        number: 1,
                        boolean: 1,
                        object: 1
                    },
                prefix = (Math.random() + "_").slice(2);

                return {
                    set: function (name, value) {
                        if (this.isDefined(name)) {
                            return false;
                        }
                        if (!ownProp.call(allowed, typeof value)) {
                            return false;
                        }
                        constants[prefix + name] = value;
                        return true;
                    },
                    isDefined: function (name) {
                        return ownProp.call(constants, prefix + name);
                    },
                    get: function (name) {
                        if (this.isDefined(name)) {
                            return _.extend(constants[prefix + name]);
                        }
                        return null;
                    }
                };
            } ()
        );

    return fix;
});