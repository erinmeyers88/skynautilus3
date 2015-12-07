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
	}

	// getTrips: function (req, res) {
	// 	.find(function (err, result) {
	// 		if (err) {
	// 			return res.status(500).send(err);
	// 		} else {
	// 			res.send(result);
	// 		}
	// 	});
	
	
	



};
