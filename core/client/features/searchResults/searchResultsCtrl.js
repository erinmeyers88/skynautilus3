angular.module("skyNautilus")
  .controller("searchResultsCtrl", function ($scope, flightSearchService, tripService, authService) {
    
    //Get authed user
   	var getUser = function () {
      authService.authedUser().then(function (data) {
        $scope.authedUser = data;
        console.log($scope.authedUser);
      });
    };

    getUser();

    //Load search results

    $scope.searchResults = flightSearchService.getFinalSearchResults();

    console.log($scope.searchResults);
    
    
    //Determines whether to show depart and return labels
    $scope.isShown = function (tripType) {
      return tripType === $scope.searchResults.tripType;
    };
    
    
    //Retreive user search to be able to repopulate the modify search form 
    $scope.getUserSearch = function () {
      $scope.userSearch = flightSearchService.getUserInput();
    };
    

    //Shows or hides save trip modal

    $scope.showHideSaveModal = function () {
      var el = document.getElementById("overlay");
      el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    };


    //Shows or hides new trip input
    
    $scope.newTripInputShown = false;
    
    //Shows or hides modify trip modal

    $scope.showHideModifySearchModal = function () {
      var el = document.getElementById("modifySearchModal");
      el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    };
    
    
    //Sets selected itinerary
    
    $scope.setSelectedItinerary = function (itinerary) {
      $scope.selectedItinerary = itinerary;
    };
    
    
    //Saves itinerary to database
    
    $scope.itineraryToSave = {};

    $scope.addTrip = function () {

      $scope.itineraryToSave.tripType = $scope.searchResults.tripType;
      
      console.log($scope.itineraryToSave.tripType);

      $scope.itineraryToSave.name = $scope.tripName;

      $scope.itineraryToSave.itineraries = [];
      $scope.itineraryToSave.itineraries.push($scope.selectedItinerary);

      $scope.itineraryToSave.user = $scope.authedUser._id;

      console.log("Logging itinerary to save", $scope.itineraryToSave);
      
      tripService.addTrip($scope.itineraryToSave).then(function (response) {
        return response;
      });

      $scope.showHideSaveModal();

    };





  });
  
  