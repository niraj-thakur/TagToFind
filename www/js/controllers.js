angular.module('starter.controllers', [])

.controller('TagCtrl',[ '$scope','$stateParams','$ionicModal','$cordovaGeolocation',function($scope,$stateParams,$ionicModal,$cordovaGeolocation) {
	$scope.tag = {id:"",type:"",name:"",location:""};
	$scope.tagArray = [];
	$scope.posOptions = {timeout: 10000, enableHighAccuracy: false};
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
	
	$scope.openTag = function(id,type){
		$scope.tag.id 	= id;
		$scope.tag.type = type;
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
		
		$cordovaGeolocation
			.getCurrentPosition($scope.posOptions)
			.then(function (position) {
					$scope.location.lat  = position.coords.latitude
					$scope.location.long = position.coords.longitude
				}, function(err) {
					// error
			});
		console.log("Before:" + $scope.tag);
		console.log($scope.tag);
		$scope.tagArray.push($scope.tag);
		$scope.tag= {id:"",type:"",name:"",location:""};
		console.log("After:" + $scope.tag);
		console.log($scope.tagArray);
		$scope.closeTag();
	}
	
}])

.controller('FindCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
