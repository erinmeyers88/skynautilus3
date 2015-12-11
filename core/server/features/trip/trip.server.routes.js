var Ctrl = require("./trip.server.controller");


module.exports = function (app) {

	app.route("/api/trips")
		.post(Ctrl.addTrip)
		.get(Ctrl.getTrips)	
		.put(Ctrl.updateTrip);

	app.route("/api/trips/:tripId")
		.delete(Ctrl.deleteTrip);
	
	app.route("/api/trips/itineraries/:itineraryId")
		.delete(Ctrl.deleteItinerary);
		
	app.route("/api/trips/:tripName")	
		.get(Ctrl.getTrip);

};