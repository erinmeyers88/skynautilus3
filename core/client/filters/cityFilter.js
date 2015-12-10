angular.module("skyNautilus").filter("cityFilter", function () {

		return function (items, search) {
			if (!search) {
				return items;
			}

			var searchCity = search.city;
			if (!searchCity || '' === searchCity) {
				return items;
			}

			return items.filter(function (element, index, array) {
				return element.city.code === search.city;
			});

		};
		
		
		
		// var display = [];
		
		// console.log(citiesToFilterOut);
		
		// angular.forEach(input, function (listing, citiesToFilterOut) {
		// 	citiesToFilterOut.forEach(function (city) {
		// 		if (listing.slice[0].segment[0].leg[0].origin !== city) {
		// 			display.push(listing);
		// 		}
		// 	});


		// });
		// return display;
		
		
		// 	citiesToFilterOut.forEach(function (city) {
		// 		if (input.slice[0].segment[0].leg[0].origin !== city)
		// 		display.push(input);
		// 	});
		
		// 	return display;
		// };
	
	
	
	
	

	});