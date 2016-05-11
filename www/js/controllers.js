angular.module('starter.controllers', [])

.controller('TagCtrl',[ '$scope','$state','$stateParams','$ionicModal','$ionicLoading','$ionicPlatform','TagFactory','$cordovaGeolocation',function($scope,$state,$stateParams,$ionicModal,$ionicLoading,$ionicPlatform,TagFactory,$cordovaGeolocation) {
	$scope.tag = {id:"",type:"",name:"",location:{}};
	
	
	//Create the tag modal that will use later.
	$ionicModal.fromTemplateUrl('templates/tag-modal.html',{
		scope:$scope
	}).then(function(modal){
		$scope.tagForm = modal;
	});
	
	//Triggered in th eTag modal to close it.
	$scope.closeTag = function(){
		$scope.tagForm.hide();
	}
	
	//Open the Tag modal.
	
	$scope.openTag = function(id,type,icon){
		$scope.tag.id 	= id;
		$scope.tag.type = type;
        $scope.tag.icon = icon;
		$scope.showPlace = false;
		$scope.showRelativeName = false;
		
		if($scope.tag.id == 1){
			$scope.showPlace = true;
		}else if($scope.tag.id == 2){
			$scope.showRelativeName = true;
		}
		
		$scope.tagForm.show();
	}
	
	//Perform the doTag action.
	$scope.doTag = function(){
		
		 $ionicPlatform.ready(function() {
             
              $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
             });
         
                var posOptions = {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 0
                };
             
         $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
             $scope.tag.location.lat  = position.coords.latitude;
            $scope.tag.location.long = position.coords.longitude;
             $ionicLoading.hide();
             
           	
		      TagFactory.pushTags($scope.tag);
		      $scope.tag= {id:"",type:"",name:"",location:{}};
		
		      $scope.closeTag();
                }, function(err) {
                        $ionicLoading.hide();
                        $scope.tag.location = {error:"location error"};
                        $scope.closeTag();
                });
         })
   
            
            
		
	}
	
}])

.controller('FindCtrl', ['$scope','TagFactory','$ionicModal',function($scope,TagFactory,$ionicModal ) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.mapHeading = "Google Map";
  $scope.$on('$ionicView.enter', function(e) {
      
      $scope.checkFind();
  });
   $scope.tag = {id:"",type:"",name:"",location:""}; 
   $scope.showTags = false;
    $scope.message = "Loading...";
     $scope.tags = TagFactory.getTags();
    $scope.checkFind = function(){
        console.log("Inside the checkFind");
         console.log($scope.tags.length);
        if($scope.tags.length > 0){
          $scope.showTags = true;  
        }
        else{
             $scope.showTags = false;
             $scope.message = "OOps didnt find any tags";
        }
    }
  
    //Create the map modal that will use later.
	$ionicModal.fromTemplateUrl('templates/find-map.html',{
		scope:$scope
	}).then(function(modal){
		$scope.mapForm = modal;
	});
	
	//Triggered in the map modal to close it.
	$scope.closeMap = function(){
		$scope.mapForm.hide();
	}
	
	//Show map function
	var directionsDisplay = new google.maps.DirectionsRenderer();;
	var directionService = new google.maps.DirectionsService();
	var directionsLatLng;
	var directionsLat;
	var directionsLong;
	var currentPosOptions;
	var directionsMap;
	var start;
	var end;
	
	function currentLocation(){
	
		currentPosOptions = {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                };
		$cordovaGeolocation.getCurrentPosition(currentPosOptions).then(function (position) {
            directionsLat  = position.coords.latitude;
            directionsLong = position.coords.longitude;	

				directionsLatLng = new google.maps.LatLng(directionsLat,directionsLong);
				
                }, function(err) {
                        console.log("error in currentLocation function");
                });
		
	}
	
	function getDirections(){
		
		
		//start = new google.maps.LatLng(directionsLatLng);
		var mapOptions = {
			zoom:7,
			center:start
		};
		directionsMap = new google.maps.Map(document.getElementById("map"),mapOptions);
		directionsDisplay.setMap(directionsMap);
	}
	
		function calcRoute(pos,node) {
		var directionsService = new google.maps.DirectionsService();
		var request = {
			origin:pos,
			destination:node,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
			};

		directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
							directionsDisplay.setDirections(response);
					} else { alert("Directions failed: "+status); }
				});
		}
	$scope.iframeHeight = window.innerHeight;
	$scope.iframeWidth = window.innerWidth;
			
	//Open the Tag modal.
	
	$scope.findInMap = function(tag){
		$scope.mapHeading += " - " + tag.name;
		$scope.mapForm.show();
		//mapShow(tag.location.lat , tag.location.long, tag.name);
		calcRoute();
		
	}
   
 
}])



.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
