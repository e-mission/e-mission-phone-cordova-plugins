angular.module('starter.controllers', ['ionic'])

.controller("TripsCtrl", function($scope, $ionicPlatform) {
    console.log("controller TripsCtrl called");

    //DATA: Gautham, this is where you link the data.
    /*
    $scope.trips = [
         {mode:'walking',confidence:1},
         {mode:'car',confidence:0.5},
         {mode:'walking',confidence:1},
         {mode:'cycling',confidence:0.3},
         {predictedMode:'cycling',confidence:0.3}
    ];
    */

    /*
     * I think that this may be a cause of a controller trying to do too much,
     * and should probably be moved into a service.
     */

    // code to get trips from most recent day only
    var db = window.sqlitePlugin.openDatabase({name: "TripSections.db", location: 2, createFromLocation: 1});
    tripSectionDbHelper.getJSON(db, function(jsonTripList) {
        $scope.$apply(function () {
            //$scope.trips = tripSectionDbHelper.getUncommitedSections(jsonTripList);
            var all_trips = tripSectionDbHelper.getUncommitedSections(jsonTripList);
            var mr_trip = tripSectionDbHelper.getUncommitedSections(jsonTripList).pop();
            var mr_trips = [mr_trip];
            console.log("mr_trip" + JSON.stringify(mr_trip));
            var today = new Date(mr_trip.startTime.date);
            for (var i = 0; i < all_trips; i++) {
              var trip = all_trips[i];
              console.log("trip in all_trips " + JSON.stringify(trip))

              // hacky way to check if date is the same
              var tripDate = new Date(trip.startTime.date)
              if (tripDate.getMonth() == today.getMonth()) {
                if (tripDate.getDay() == today.getDay()) {
                  if (tripDate.getYear() == today.getYear()) {
                    mr_trips.push(trip);
                    console.log('finalized mr_trip array: ' + mr_trips);
                  }
                }
              }
            }
            $scope.trips = mr_trips;
            $scope.date = "" + today.getMonth() + "/" + today.getDay() + "/" + today.getYear();
        });
    });

    /*
    var db = $cordovaSQLite.openDB({name: "TripSections.db"});
    tripSectionDbHelper.getJSON({name: "TripSections.db"}, function(jsonTripList){
        alert("this is actually happening");
        console.log("testing other things");
        $scope.trips = tripSectionDbHelper.getUncommittedSections(jsonTripList);
        console.log($scope.trips.length + "trips have been loaded");
    });
    */

    $scope.pickImage = function(item){
        if (item.predictedMode != null) {
            var item_mode = item.predictedMode;
        } else {
            var item_mode = item.autoMode;
        }

    	if (item_mode == 'walking') {
    		return 'img/walking.jpg';
    	} if (item_mode == 'car') {
    		return 'img/car.jpg';
    	} if (item_mode == 'cycling') {
            return 'img/cycling.jpg';
        } if (item_mode == 'air') {
            return 'img/air.jpg';
        } if (item_mode == 'bus') {
            return 'img/bus.jpg';
        } if (item_mode == 'train') {
            return 'img/train.jpg';
        }
    };

    //Change according to datatype in actual data object and the intervals set in the app.
    // Intervals: Green - confidence > 80 ; Yellow: 80 > confidence > 70; Red: 70 > confidence
    $scope.pickColor = function(item){
        if (item.confidence >= 0.9) {
            return "color : green";
        } else if (item.confidence >= 0.7) {
            return "color : orange";
        } else {
            return "color : red";
        }
    };

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
