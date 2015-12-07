var config = require('../../config/config'),
    passport = require('passport');


module.exports = function (app) {

	// GOOGLE AUTHENTICATION AND REDIRECTION
    app.route('/login/google')
        .get(passport.authenticate('google', {
            session: false,
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }));

    app.route('/login/google/callback')
        .get(passport.authenticate('google', {
            successRedirect: '/',
            failure: '/'
        }));


    // FACEBOOK AUTHENTICATION AND REDIRECTION
    app.route('/login/facebook')
        .get(passport.authenticate('facebook', {
            scope: ['email']
        }));

    app.route('/login/facebook/callback')
        .get(passport.authenticate('facebook', {
            successRedirect: '/',
            failure: '/'
        }));


    // // ROOT OF THE APPLICATION
    // app.route('/')
    //     .get(function (req, res) {
    //         res.render('index', {
    //             userJSON: req.user,
    //             userStr: JSON.stringify(req.user)
    //         });
    //     });



    // // AUXILIARY ENDPOINTS

    // // checking if logged-in
    // app.route('/auth/checklogin')
    //     .get(function (req, res) {
    //         if (req.user) {
    //             res.send(req.user);
    //         }
    //         else res.send(false);
    //     });


    // // logging-out
    // app.route('/auth/logout')
    //     .get(function (req, res) {
    //         req.logout();
    //         res.redirect('/');
    //     });


    // // protecting routes
    // app.route('/notallowed')
    //     .get(function (req, res, next) {
    //         if (!req.user) {
    //             res.redirect('/');
    //         }
    //         next();
    //     });

};