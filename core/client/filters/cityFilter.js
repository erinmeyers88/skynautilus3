angular.module("skyNautilus").filter("cityFilter", function () {

	return function (input) {
		var display = [];
		angular.forEach(input, function (listing, citiesToFilterOut) {
			citiesToFilterOut.forEach(function (city) {
				if (listing.slice[0].segment[0].leg[0].origin !== city) {
					display.push(listing);
				}
			});


		});
		return display;
	};

});