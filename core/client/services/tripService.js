angular.module("skyNautilus")
	.service("tripService", function ($http) {
		
		
		//Add trip///////////
		this.addTrip = function (trip) {
			return $http ({
				method: "POST",
				url: "/api/trips",
				data: trip
			}).then(function (response) {
				return response.data;
			});
		};
		
		//Get trips///////////
		this.getTrips = function (trip) {
			return $http ({
				method: "GET",
				url: "/api/trips",
				data: trip
			}).then(function (response) {
				return response.data;
			});
		};
		
		
	});