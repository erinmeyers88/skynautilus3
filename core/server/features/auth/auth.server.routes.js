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

    app.route("/getautheduser")
        .get(function (req, res) {
            res.status(200).json(req.user);
        });



    // logging-out
    app.route('/logout')
        .get(function (req, res) {
            req.logout();
            console.log(req.user);
            res.redirect('/');
        });



};