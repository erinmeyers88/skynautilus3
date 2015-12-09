angular.module("skyNautilus")
	.controller("tripCtrl", function ($scope, flightSearchService, tripService) {

		$scope.selectedTrip = tripService.displaySelectedTrip();

		console.log("logging selected trip in controller", $scope.selectedTrip);
	  
		//Determines whether to show depart and return labels
		$scope.isShown = function (tripType) {
			return tripType === $scope.selectedTrip.tripType;
		};


	});