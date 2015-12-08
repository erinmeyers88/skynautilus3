angular.module("skyNautilus").controller("tripsListCtrl", function ($scope, flightSearchService, tripService, authService) {

	var getUser = function () {
		authService.authedUser().then(function (data) {
			$scope.authedUser = data;
			console.log(data);
		});	
	};

	getUser();
	
	

	$scope.getTrips = function () {
		tripService.getTrips().then(function (response) {
			$scope.trips = response;
			$scope.trips.forEach(function (trip) {
				trip.itineraries.forEach(function (itinerary) {
					itinerary.saleTotal = Number(itinerary.saleTotal.replace("$", ""));
					trip.prices = [];
					trip.prices.push(itinerary.saleTotal);
					trip.totalPrice = trip.prices.reduce(function (a, b) {
						return a + b;
					});
				});
			});
			console.log($scope.trips);
		});
	};
	
	

	$scope.getTrips();


});
