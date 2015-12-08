angular.module("skyNautilus")
  .controller("tripCtrl", function ($scope, flightSearchService, tripService) {
	  
	  $scope.selectedTrip = tripService.displaySelectedTrip();
    
	  console.log($scope.selectedTrip);
	  
	  
	  
  });