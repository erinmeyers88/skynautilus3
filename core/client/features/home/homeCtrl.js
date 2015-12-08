angular.module("skyNautilus").controller("homeCtrl", HomeController);

function HomeController ($scope, flightSearchService, $state, $http) {
	
    $scope.userInput = {};
  
    //Toggles oneway or roundtrip search option display
    $scope.userInput.tripType = "roundtrip";

    $scope.showReturnDate = function () {
      return $scope.userInput.tripType === 'roundtrip';
    };
    
    //Search
    $scope.search = function () {
      flightSearchService.search($scope.userInput);
    };
    
   
  }