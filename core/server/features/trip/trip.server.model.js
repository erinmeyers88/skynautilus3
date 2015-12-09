var mongoose = require("mongoose");

var TripModel = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	name: {type: String, required: true, unique: true},
	tripType: {type: String},
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
	
	
module.exports = mongoose.model("Trip", TripModel);



