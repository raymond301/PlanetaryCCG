/**
 * CardController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var fs = require('fs');


module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/card/new`
   */
   new: function (req, res) {
      return res.view({ cardType: req.param('type') });
  },


  create: function(req, res, next) {
      if (req.method != 'POST')
          return res.notFound();

      console.log(req.body);


      var base64Data = req.body['image64'].replace(/^data:image\/png;base64,/,"");

      var randStr = Math.random().toString(36).substring(8);
      var imagePath =  "assets/images/public/"+randStr+".png";
      fs.writeFile(imagePath, base64Data, 'base64', function(err) {
          console.log(err);
      });

      var cardObj = {
          type: req.body['card_type'],
          title: req.body['title'],
          cost: req.body['cost'],
          quote: req.body['desc'],
          createdBy: req.session.User.id,
          imagePath: imagePath
      }




      Card.create(cardObj, function cardCreated(err, card) {
          // // If there's an error
          if (err) {
              console.log(err);
              req.session.flash = {
                  err: err
              }

              // If error redirect back
              return res.redirect('/card/new/?type='+req.body['card_type']);
          }

          card.save(function(err, card) {
              if (err) return next(err);

              // After successfully creating the card
              // redirect to the user profile page
              res.redirect('/user/show/' + req.session.User.id);
          });
      });
  },

  /**
   * Action blueprints:
   *    `/card/show`
   */
   show: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/card/delete`
   */
   delete: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to CardController)
   */
  _config: {}

  
};
