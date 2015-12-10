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
	
	updateTrip: function (req, res) {
		Trip.findOneAndUpdate({user: req.body.user, name: req.body.name}, {$push: {"itineraries": {saleTotal: req.body.itineraries[0].saleTotal, slice: req.body.itineraries[0].slice, pricing: req.body.itineraries[0].pricing}}},
		function (err, trip) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(trip);
			}
		});
	},


	getTrips: function (req, res) {
		Trip.find({ user: req.user }).populate("user").exec().then(function (user, err) {
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

		Trip.findOne({ name: req.params.tripName }, function (err, trip) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(trip);
			}
		});



	}

};
