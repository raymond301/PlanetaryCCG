/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    /**
     * Action blueprints: `/user/new`
     */
    new: function (req, res) {
        return res.view({message: ''});
    },



    create: function(req, res, next) {
        var userObj = {
            username: req.param('name'),
            email: req.param('email'),
            password: req.param('password')
        }

        // Create a User with the params sent from
        // the sign-up form --> new.ejs
        User.create(userObj, function userCreated(err, user) {
            // // If there's an error
            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }

                // If error redirect back to sign-up page
                return res.redirect('/user/new');
            }

            // Log user in
            req.session.authenticated = true;
            req.session.User = user;

            // Change status to online
            user.online = true;
            user.save(function(err, user) {
                if (err) return next(err);

                // add the action attribute to the user object for the flash message.
                user.action = " signed-up and logged-in."

                // Let other subscribed sockets know that the user was created.
                User.publishCreate(user);

                // After successfully creating the user
                // redirect to the show action
                // From ep1-6: //res.json(user);

                res.redirect('/user/show/' + user.id);
            });
        });
    },






    /**
     * Action blueprints: `/user/show`
     */
    show: function (req, res) {
        User.findOne({'id': req.params['id']}, function(err, user) {
            if (err) return next(err);
            res.view({user: user})
        })
    },


    /**
     * Action blueprints: `/user/edit`
     */
    edit: function (req, res) {

        // Send a JSON response
        return res.json({
            hello: 'world'
        });
    },


    /**
     * Action blueprints:
     *    `/user/delete`
     */
    delete: function (req, res) {

        // Send a JSON response
        return res.json({
            hello: 'world'
        });
    },




    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to UserController)
     */
    _config: {}


};