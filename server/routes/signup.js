define(
    ["express"],
    function (express) {
        return function (passport) {
            var router = express.Router();

            router.post("/signup", function (req, res, next) {
                passport.authenticate("local-signup", function (err, user, info) {
                    if (err) {
                        // will generate a 500 error
                        return next(err); 
                    }

                    // Generate a JSON response reflecting authentication status
                    if (info === "EMAILEXISTED") {
                        return res.send({ success: false, message: "Email already exists" });
                    }

                    return res.send({ success: true, user: user });
                })(req, res, next);
            });

            return router;
        }
    });