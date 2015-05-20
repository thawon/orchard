define(
    ["underscore", "sharedLib/fix-variables"],
    function (_, fix) {
        var AUTH_EVENTS = _.extend(fix);

        AUTH_EVENTS.set("constants.authEvents",
        {
            loginSuccess: "auth-login-success",
            loginFailed: "auth-login-failed",
            logoutSuccess: "auth-logout-success",
            logoutFailed: "auth-logout-failed",
            sessionTimeout: "auth-session-timeout",
            notAuthenticated: "auth-not-authenticated",
            notAuthorized: "auth-not-authorized"
        });

        return AUTH_EVENTS.get("constants.authEvents");
    });