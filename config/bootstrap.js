/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */
var seedUsers = [{
    'username' : 'admin',
    'password' : 'myapp1',
    'signupDate' : new Date(),
    'winCount' : 900,
    'loseCount' : 5,
    'emailAddress' : 'admin@here.com',
    'admin' : true
}];
/**
 * THIS DOES NOT CURRENTLY WORK!
 * @param cb
 */


module.exports.bootstrap = function (cb) {
    User.count().exec(function(err, count){
        if(err){
            sails.log.error('Already Have Users');
            return cb(err);
        }
        if(count < 1){ User.create(seedUsers).exec(cb);  }
    }),

    User.update({}, {
        online: false
    },
    function userUpdated(err, users) {
        if (err) {
            console.log(err);
        } else {
            // console.log(users);
        }
        cb();
    });



    // It's very important to trigger this callack method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    //cb();
};