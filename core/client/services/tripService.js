angular.module("skyNautilus")
	.service("tripService", function ($http, $location) {
		
		
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
		
		//Update trip/////////
		
		this.updateTrip = function (trip) {
			return $http({
				method: "PUT",
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

		//Delete itinerary
		
		this.deleteItinerary = function (itineraryId) {
			return $http({
				method: "DELETE",
				url: "/api/trips/itineraries/" + itineraryId
			});
		};
		
		
		

		this.getSelectedTrip = function (trip) {
			var endpoint = "/api/trips/" + trip.name;
			return $http({
				method: "GET",
				url: endpoint
			}).then(function (response) {
				return response.data;
				// $location.path("/mytrips/" + trip.name);
			});
		};


		

	});