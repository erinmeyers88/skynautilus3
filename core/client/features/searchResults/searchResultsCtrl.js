angular.module("skyNautilus")
  .controller("searchResultsCtrl", function ($scope, flightSearchService, tripService, authService, $location) {
    
    //Get current url
    $scope.url = $location.absUrl();

    $scope.showNewSearch = function () {
      return $scope.url !== "/#/home";
    };
    
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

    
    
    
    //Retreive user input to be able to repopulate the modify search form 
    $scope.getUserInput = function () {
      $scope.userInput = flightSearchService.getUserInput();
      console.log("logging user input on ctrl", $scope.userInput);

      $scope.tripType = $scope.userInput.tripType;
      $scope.destination = $scope.userInput.destination;
      $scope.departureDate = $scope.userInput.departureDate;
      $scope.returnDate = $scope.userInput.returnDate;
      $scope.passengerCount = $scope.userInput.passengerCount.toString();
    };
    
    
    $scope.showReturnDate = function () {
      return $scope.userInput.tripType === 'roundtrip';
    };
    

    //Search
    $scope.search = function () {
      flightSearchService.search($scope.userInput);
    };
   
   


    //Shows or hides save trip modal

    $scope.showHideSaveModal = function () {
      var el = document.getElementById("overlay");
      el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    };


    //Shows or hides new trip input
    
    $scope.newTripInputShown = false;
    
    //Shows or hides modify search modal

    $scope.showHideModifySearchModal = function () {
      $scope.getUserInput();
      var a = document.getElementById("modifySearchModal");
      a.style.visibility = (a.style.visibility == "visible") ? "hidden" : "visible";

      var b = document.querySelector(".formBackground");
      b.style.position = "relative";
      b.style.top = "0px";
      b.style.left = "0px";
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
  
  