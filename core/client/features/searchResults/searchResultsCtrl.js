angular.module("skyNautilus")
  .controller("searchResultsCtrl", function ($scope, flightSearchService, tripService) {
    
    // //Loads the search results from the API call, sets trip type
    // $scope.getsearchResults = function () {
    //   $scope.searchResults = loadResults;
    // }();
    
   
    
    $scope.searchResults = flightSearchService.getFinalSearchResults();
    
     console.log($scope.searchResults);
    
    // flightSearchService.getFinalSearchResults().then(function (response) {
    //   $scope.searchResults = response;
    // });
    
    
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

      console.log($scope.selectedItinerary);

      $scope.itineraryToSave.name = $scope.tripName;

      $scope.itineraryToSave.itineraries = [];
      $scope.itineraryToSave.itineraries.push($scope.selectedItinerary);

      console.log($scope.itineraryToSave);

      tripService.addTrip($scope.itineraryToSave).then(function (response) {
        return response;
      });
      
      $scope.showHideSaveModal();
      
    };




  });
  
  