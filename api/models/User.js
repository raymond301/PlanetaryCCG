/**
 * User
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 */
var bcrypt = require('bcrypt');

module.exports = {
    schema: true,

    // User => username, password, signupDate, winCount, loseCount, emailAddress
    attributes: {
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            minLength: 4,
            required: true,
            columnName: 'encrypted_password'
        },
        signupDate: 'DATE',
        winCount: 'INTEGER',
        loseCount: 'INTEGER',
        email: {
            //type: 'string'
            type: 'email', // Email type will get validated by the ORM
            required: true
        },
        online: {
            type: 'boolean',
            defaultsTo: false
        },

        admin: {
            type: 'boolean',
            defaultsTo: false
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.confirmation;
            delete obj.encryptedPassword;
            delete obj._csrf;
            return obj;
        }
    },

    // Lifecycle Callbacks
    beforeCreate: function(values, next) {
        bcrypt.hash(values.password, 10, function(err, hash) {
            if(err) return next(err);
            values.password = hash;
            values.signupDate = new Date;
            next();
        });
    }
};
