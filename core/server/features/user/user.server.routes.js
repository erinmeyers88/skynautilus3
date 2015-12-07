var Ctrl = require("./user.server.controller");
var config = require('../../config/config');
var facebook = require("../../services/facebookService")(config.facebook.clientID, config.facebook.clientSecret);

module.exports = function (app) {

app.route('/api/user')
	.get(Ctrl.getUser);

};