module.exports = {
    db: 'mongodb://user:userpassword@ds061974.mongolab.com:61974/skynautilus-001',
	sessionSecret: "productionSecret",
	facebook: {
        clientID: "101210486917227",
        clientSecret: "9067ae19785de478c5b96bfe2db8da70",
        callbackURL: "",
        enableProof: false,
        passReqToCallback: true,
        profileFields: ["emails"]
    },
     google: {
        clientID: "",
        clientSecret: "",
        callbackURL: ""
    }
};