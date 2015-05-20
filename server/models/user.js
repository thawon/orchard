define(
    [],
    function () {
        var mongoose = require("mongoose"),
            bcrypt = require("bcrypt-nodejs");

        var userSchema = mongoose.Schema({
            email: String,
            password: String,
            userRole: String,
            lastLoggedInDateTime: Date,
            firstname: String,
            lastname: String
        }, { collection: 'Users' });

        // methods ======================
        // generating a hash
        userSchema.methods.generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        };

        // checking if password is valid
        userSchema.methods.validPassword = function (password) {
            return bcrypt.compareSync(password, this.password);
        };

        return mongoose.model("User", userSchema);
    });