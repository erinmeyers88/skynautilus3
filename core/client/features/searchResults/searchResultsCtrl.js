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

   

    
    
    //Remove duplicates from origin and destinations
    

      
    $scope.searchResults.cleanOriginsAndDestinations = [];

    var found;

    for (var x = 0; x < $scope.searchResults.originsAndDestintation.length; x++) {
        found = undefined;
        for (var y = 0; y < $scope.searchResults.cleanOriginsAndDestinations.length; y++) {
          console.log($scope.searchResults.cleanOriginsAndDestinations.length);
            if ($scope.searchResults.originsAndDestintation[x].airportCode === $scope.searchResults.cleanOriginsAndDestinations[y].airportCode) {
                found = true;
                break;
            }
        }
        if (!found) {
 
            $scope.searchResults.cleanOriginsAndDestinations.push($scope.searchResults.originsAndDestintation[x]);
        }
    }
    
    
    /////
    


    for (var city in $scope.searchResults.cleanOriginsAndDestinations) {
      $scope.searchResults.cleanOriginsAndDestinations[city].on = true;
    }



//Remove duplicates from airlines
    

      
    $scope.searchResults.cleanAirlines = [];

    var foundAirline;

    for (var a = 0; a < $scope.searchResults.airlines.length; a++) {
        foundAirline = undefined;
        for (var b = 0; b < $scope.searchResults.cleanAirlines.length; b++) {
    
            if ($scope.searchResults.airlines[a].code === $scope.searchResults.cleanAirlines[b].code) {
                foundAirline = true;
                break;
            }
        }
        if (!foundAirline) {
          
          $scope.searchResults.airlines[a].name = $scope.searchResults.airlines[a].name.replace(",", "");
          $scope.searchResults.airlines[a].name = $scope.searchResults.airlines[a].name.replace("Inc.", "");
          $scope.searchResults.airlines[a].name = $scope.searchResults.airlines[a].name.replace("Co.", "");
          $scope.searchResults.airlines[a].name = $scope.searchResults.airlines[a].name.replace("Ltd.", "");
          
            $scope.searchResults.cleanAirlines.push($scope.searchResults.airlines[a]);
        }
    }





    for (var airline in $scope.searchResults.cleanAirlines) {
      $scope.searchResults.cleanAirlines[airline].on = true;
    }
    
     console.log("REsults in contr", $scope.searchResults);

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


    $scope.limit = 17;

    
 

    //Filter
 
   
     
    $scope.filterFunc1 = function (item) {  
      if ($scope.searchResults.tripType === "roundtrip") {

        var destinations = [];
        
        for (var i = 0; i < item.slice[0].segment.length; i++) { 
          for (var j = 0; j < item.slice[0].segment[i].leg.length; j++) {
            destinations.push(item.slice[0].segment[i].leg[j].origin);
            destinations.push(item.slice[0].segment[i].leg[j].destination);
          }     
        }
        
        for (var i = 0; i < item.slice[1].segment.length; i++) {
          for (var j = 0; j < item.slice[1].segment[i].leg.length; j++) {
            destinations.push(item.slice[1].segment[i].leg[j].origin);
            destinations.push(item.slice[1].segment[i].leg[j].destination);
          }     
        }

      } else {
        
        var destinations = [];
        
         for (var i = 0; i < item.slice[0].segment.length; i++) { 
          for (var j = 0; j < item.slice[0].segment[i].leg.length; j++) {
            destinations.push(item.slice[0].segment[i].leg[j].origin);
            destinations.push(item.slice[0].segment[i].leg[j].destination);
          }     
        }
      }


      var excludedCities = $scope.searchResults.cleanOriginsAndDestinations.filter(function (val) {
        return !val.on;
      });

      for (var city in excludedCities) {
        var isExcludedInDestinations = destinations.indexOf(excludedCities[city].airportCode) >= 0;
        if (isExcludedInDestinations) {
          return false;
        }
      }

      if ($scope.searchResults.tripType === "roundtrip") {

        var airlines = [];

        
        for (var i = 0; i < item.slice[0].segment.length; i++) { 
          for (var j = 0; j < item.slice[0].segment[i].leg.length; j++) {
     
            airlines.push(item.slice[0].segment[i].flight.carrier);
          }     
        }
        
           for (var i = 0; i < item.slice[1].segment.length; i++) { 
          for (var j = 0; j < item.slice[1].segment[i].leg.length; j++) {
     
            airlines.push(item.slice[1].segment[i].flight.carrier);
          }     
        }      
      } else {
        
        var airlines = [];
        for (var i = 0; i < item.slice[0].segment.length; i++) { 
          for (var j = 0; j < item.slice[0].segment[i].leg.length; j++) {
        
            airlines.push(item.slice[0].segment[i].flight.carrier);
          }     
        }  
      }

      var excludedAirlines = $scope.searchResults.cleanAirlines.filter(function (val) {
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
  
  