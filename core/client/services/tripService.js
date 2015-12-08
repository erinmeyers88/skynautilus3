angular.module("skyNautilus")
	.service("tripService", function ($http, $state) {
		
		
		//Add trip///////////
		this.addTrip = function (trip) {
			return $http({
				method: "POST",
				url: "/api/trips",
				data: trip
			}).then(function (response) {
				return response.data;
			});
		};
		
		//Get trips///////////
		this.getTrips = function (trip) {
			return $http({
				method: "GET",
				url: "/api/trips",
				data: trip
			}).then(function (response) {
				return response.data;
			});
		};
		
		
		//Delete trip///
		
		this.deleteTrip = function (tripId) {
			return $http({
				method: "DELETE",
				url: "/api/trips/" + tripId
			});
		};

		//Go to trip
		
		
		var selectedTrip = {};

		this.getSelectedTrip = function (trip) {
			console.log("logging this trip:", trip);
			
			function getTrip(trip) {
				return $http({
					method: "GET",
					url: "/api/trips/" + trip.name
				}).then(function (response) {
					console.log("returning selected trip", response);
					selectedTrip =  response.data;
				});
			}
			
			getTrip();
			
			function goToTrip (trip) {
				$state.go("mytrips/" + trip.name);
			}
			
			goToTrip();	
		};
		
		
		this.displaySelectedTrip = function () {
			return selectedTrip;	
		};
		

	});