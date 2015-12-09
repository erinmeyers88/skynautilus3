angular.module("skyNautilus")
	.controller("tripCtrl", function ($scope, flightSearchService, tripService, authService, $location) {

		//Get current url
		$scope.url = $location.absUrl();

		$scope.showNewSearch = function () {
			return $scope.url !== "/#/home";
		};
		//Get authed user
		var getUser = function () {
			authService.authedUser().then(function (data) {
				$scope.authedUser = data;
			});
		};

		getUser();



		$scope.selectedTrip = tripService.displaySelectedTrip();

		console.log("logging selected trip in controller", $scope.selectedTrip);
	  
		//Determines whether to show depart and return labels
		$scope.isShown = function (tripType) {
			return tripType === $scope.selectedTrip.tripType;
		};


	});