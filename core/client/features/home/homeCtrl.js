angular.module("skyNautilus").controller("homeCtrl", HomeController);

function HomeController ($scope, flightSearchService, $state) {
	
    $scope.userInput = {};
  
    //Toggles oneway or roundtrip search option display
    $scope.userInput.tripType = "roundtrip";

    $scope.showReturnDate = function () {
      return $scope.userInput.tripType === 'roundtrip';
    };
    
    //Search
    $scope.search = function () {
      flightSearchService.search($scope.userInput);
      // $scope.goToSearchResults();
    };
    

    //Shows or hides login modal
    $scope.showHideLoginModal = function () {
      var el = document.getElementById("loginModal");
      el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    };
    
  }