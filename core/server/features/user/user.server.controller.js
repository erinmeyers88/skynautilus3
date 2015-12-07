var User = require("./user.server.model");

module.exports = {


	addUser: function (req, res) {
		var newUser = new User(req.body);
		newUser.save(function (err, result) {
			if (err) {
				return res.status(500).send(err);
			} else {
				res.send(result);
			}
		});
	},

	getUser: function (req, res) {
		User.findById(req.params.id, req.body, function (err, user) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(user);
			}
		});
	}



};
