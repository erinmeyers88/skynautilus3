angular.module("skyNautilus").controller("tripsListCtrl", function ($scope, flightSearchService, tripService, authService, $location) {

	//Get current url
    $scope.url = $location.absUrl();

    $scope.showNewSearch = function () {
		return $scope.url !== "/#/home";
    };

	console.log($scope.showNewSearch());

	//Get authed user
	var getUser = function () {
		authService.authedUser().then(function (data) {
			$scope.authedUser = data;
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
		});
	};



	$scope.getTrips();



	$scope.deleteTrip = function (tripId) {
		tripService.deleteTrip(tripId).then(function (response) {
			$scope.selectedTrip = {};
			$scope.getTrips();
		});
	};


	$scope.deleteItinerary = function (itineraryId, index) {
		console.log("logging in ctrl", itineraryId, index);
		tripService.deleteItinerary(itineraryId).then(function (response) {
			$scope.selectedTrip.itineraries.splice(index, 1);
		});
	};


	$scope.getSelectedTrip = function (trip) {
		console.log("getting trip", trip.name);
		tripService.getSelectedTrip(trip).then(function (response) {
			$scope.selectedTrip = response;
			console.log("response", response);
		});
	};


	


});
