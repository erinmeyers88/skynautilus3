var Trip = require("./trip.server.model");

module.exports = {


	addTrip: function (req, res) {
		var newTrip = new Trip(req.body);
		newTrip.save(function (err, result) {
			if (err) {
				return res.status(500).send(err);
			} else {
				res.send(result);
			}
		});
	},

	getTrips: function (req, res) {
		Trip.find({user: req.user}).populate("user").exec().then(function (user, err) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(user);
			}
		});
	},

	deleteTrip: function (req, res) {
		Trip.findByIdAndRemove(req.params.tripId, function (err, result) {
			if (err) {
			return res.status(500).send(err);
			} else {
				res.send(result);
			}
		});
	},

	getTrip: function (req, res) {
		
		Trip.findOne({name: req.params.tripName}, function (err, trip) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(trip);
			}
		});
	}

};
