angular.module("skyNautilus")
  .controller("searchResultsCtrl", function ($scope, flightSearchService, tripService, authService, $location, $state) {
    
    //Get current url
    $scope.url = $location.absUrl();

    $scope.showNewSearch = function () {
      return $scope.url !== "/#/home";
    };
    
    //Get authed user
   	var getUser = function () {
      authService.authedUser().then(function (data) {
        $scope.authedUser = data;
        console.log("logging autheduser", $scope.authedUser);
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

    $scope.isShownModifyModal = function (tripType) {
      return tripType === $scope.tripType;
    };
    
    
    
    
    
    
    
    
    //Retreive user input to be able to repopulate the modify search form 
    $scope.getUserInput = function () {
      $scope.userInput = flightSearchService.getUserInput();
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
      $scope.newUserInput = {
        tripType: $scope.tripType,
        destination: $scope.destination,
        departureDate: $scope.departureDate,
        returnDate: $scope.returnDate,
        passengerCount: $scope.passengerCount,
      };
      console.log("logging newUserInput", $scope.newUserInput);
      flightSearchService.search($scope.newUserInput);
    };
   

    //Shows or hides save trip modal

    $scope.showHideSaveModal = function () {

      function getcurrentUserInfo() {
        tripService.getTrips().then(function (response) {
          $scope.trips = response;

          $scope.tripsDropdown = [];

          console.log("scope.trips", $scope.trips);
          $scope.trips.forEach(function (trip) {
            $scope.tripsDropdown.push(trip.name);
          });

          console.log("trip dropdown", $scope.tripsDropdown);

        });
      };

      getcurrentUserInfo();


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
    };
    
    
    //Sets selected itinerary
    
    $scope.setSelectedItinerary = function (itinerary) {
      $scope.selectedItinerary = itinerary;
    };
    
    
    //Saves itinerary to database
    
    $scope.itineraryToSave = {};

    $scope.addTrip = function () {

      if ($scope.tripName) {
        $scope.itineraryToSave.user = $scope.authedUser._id;
        $scope.itineraryToSave.tripType = $scope.searchResults.tripType;
        $scope.itineraryToSave.name = $scope.tripName;
        $scope.itineraryToSave.itineraries = [];
        $scope.itineraryToSave.itineraries.push($scope.selectedItinerary);
        tripService.updateTrip($scope.itineraryToSave).then(function (response) {
          return response;
        });
        
      } else {
        $scope.itineraryToSave.user = $scope.authedUser._id;
        $scope.itineraryToSave.tripType = $scope.searchResults.tripType;
        $scope.itineraryToSave.name = $scope.newTripName;
        $scope.itineraryToSave.itineraries = [];
        $scope.itineraryToSave.itineraries.push($scope.selectedItinerary);
        tripService.addTrip($scope.itineraryToSave).then(function (response) {
          return response;
      });
    };



    $scope.showHideSaveModal();

  };


    

//Filter
    
$scope.citiesToFilterOut = [$scope.searchResults.origin];

$scope.addCityToFilter = function (item) {
  console.log(item);
  $scope.citiesToFilterOut = item.code;
};





  });
  
  