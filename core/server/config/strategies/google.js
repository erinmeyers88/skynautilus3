var config = require('../config'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = require('../../features/user/user.server.model');

module.exports = function () {

    passport.use(new GoogleStrategy(
        {
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },

        function (req, accessToken, refreshToken, profile, done) {
      
                
            //Searches for user in database
            var query = { 'google.id': profile.id };

            User.findOne(query, function (error, user) {

                if (user) {
                    console.log('Google user found in database: ', user);
                    done(null, user);
                }
                else {
                    console.log('Google user not found in database');
                    user = new User;
                    user.email = profile.emails[0].value;
                    user.image = profile._json.image.url;
                    user.displayName = profile.displayName;

                    user.google = {};
                    user.google.id = profile.id;
                    user.google.token = accessToken;

                    console.log('new user created: ', user);

                    user.save();
                    done(null, user);
                }
            });
        }));
};