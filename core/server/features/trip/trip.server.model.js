var mongoose = require("mongoose");

var TripModel = mongoose.Schema({
	
	name: {type: String, required: true},
	itineraries : [{
		saleTotal: {type: String},
		slice: [{
			segment: [{
				cleanDuration: {type: String},
				flight: {
					carrier: {type: String},
					number: {type: String}
				},
				leg: [{
					cleanArrivalTime: {type: Date},
					cleanDepartureTime: {type: Date},
					destination: {type: String},
					cleanDuration: {type: String},
					origin: {type: String}	
				}]
			}]
		}]	
}],
	totalPrice: {type: Number}
	
});
	
	
module.exports = mongoose.model("trip", TripModel);



