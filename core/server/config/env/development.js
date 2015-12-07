module.exports = {
    db: 'mongodb://user:userpassword@ds061974.mongolab.com:61974/skynautilus-001',
	sessionSecret: "developmentSecret",
	facebook: {
        clientID: "424258211111248",
        clientSecret: "f67cd7bf9964923640a469923370a8cf",
        callbackURL: "http://localhost:3000/login/facebook/callback",
        enableProof: false,
        passReqToCallback: true,
        profileFields: ["emails"]
    },
     google: {
        clientID: "966117703920-ei16slc3jrpm4qib6pfg7h3200rv5q1q.apps.googleusercontent.com",
        clientSecret: "TIj5KHI3QfUbTnXd-2-DENid",
        callbackURL: "http://localhost:3000/login/google/callback"
    }
};

