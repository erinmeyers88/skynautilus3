var mongoose = require("mongoose");

var UserModel = mongoose.Schema({
	trips: [{type: mongoose.Schema.Types.ObjectId, ref: "Trip"}],
	displayName: {type: String},
	image: {type: String},
	email: {type: String},
	facebook: {
		type: Object
	},
	google: {
		type: Object
	}
});


module.exports = mongoose.model("User", UserModel);