var Ctrl = require("./trip.server.controller");


module.exports = function (app) {

	app.route("/api/trips")
		.post(Ctrl.addTrip);
		// .get(Ctrl.getTrips);
	// 	.delete(Ctrl.deleteTrip);
	
	// app.route("/api/trips/:id")
	// 	.get(Ctrl.getTrip);
			
};