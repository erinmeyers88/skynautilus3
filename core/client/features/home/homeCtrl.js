angular.module("skyNautilus").controller("homeCtrl", HomeController);

function HomeController($scope, flightSearchService, $state, $http, authService, $location) {
	
  //Get current url
  $scope.url = $location.absUrl();

  $scope.showNewSearch = function () {
    return $scope.url === "/#/home";
  };
  
  //Get authed user
  var getUser = function () {
    authService.authedUser().then(function (data) {
      $scope.authedUser = data;
    });
  };

  getUser();

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