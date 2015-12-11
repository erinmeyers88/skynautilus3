angular.module("skyNautilus")
  .controller("searchResultsCtrl", function ($scope, flightSearchService, tripService, authService, $location, $state) {


    $scope.typingNewTripName = true;
    
    
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

    console.log("REsults in contr", $scope.searchResults);

    for (var city in $scope.searchResults.originsAndDestintation) {
      $scope.searchResults.originsAndDestintation[city].on = true;
    }

    for (var airline in $scope.searchResults.airlines) {
      $scope.searchResults.airlines[airline].on = true;
    }
    

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
          $scope.trips.forEach(function (trip) {
            $scope.tripsDropdown.push(trip.name);
          });
        });
      };
      getcurrentUserInfo();
      var el = document.getElementById("overlay");
      el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
      $scope.newTripName = "";
      $scope.tripName = "";
      $scope.newTripInputShown = false;
      $scope.typingNewTripName = true;
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
 
        
     
    $scope.filterFunc1 = function (item) { 
      //GO THROUGH all destination filters
      
      //IF contains any excluded city - return false
      //else return true
      
      if ($scope.searchResults.tripType === "roundtrip") {
        var destinations = [item.slice[0].segment[0].leg[0].destination, item.slice[1].segment[0].leg[0].destination];
      } else {
        var destinations = [item.slice[0].segment[0].leg[0].destination];
      }


      var excludedCities = $scope.searchResults.originsAndDestintation.filter(function (val) {
        return !val.on;
      });

      for (var city in excludedCities) {
        var isExcludedInDestinations = destinations.indexOf(excludedCities[city].airportCode) >= 0;
        if (isExcludedInDestinations) {
          return false;
        }
      }

      if ($scope.searchResults.tripType === "roundtrip") {
        var airlines = [item.slice[0].segment[0].flight.carrier, item.slice[1].segment[0].flight.carrier];
      } else {
        var airlines = [item.slice[0].segment[0].flight.carrier];
      }

      var excludedAirlines = $scope.searchResults.airlines.filter(function (val) {
        return !val.on;
      });

      for (var airline in excludedAirlines) {
        var isExcludedInAirlines = airlines.indexOf(excludedAirlines[airline].name) >= 0;
        if (isExcludedInAirlines) {
          return false;
        }
      }

      return true;


    };


  });
  
  