var passport = require('passport');

module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());


    //Stores user in session
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    
    //Gets user out of session
    passport.deserializeUser(function (user, done){
        done(null, user);
    });

    require('./strategies/google.js')();
    // require('./strategies/facebook.js')();

};