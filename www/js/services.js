angular.module('starter.services', [])

.factory('TagFactory',function(){
  var tags = [{id:"1",type:"Car",name:"Cricket",location:{lat:"18.5171",long:"73.9245"},icon:"ion-android-car"}];
    return{
       getTags : function(){
           return tags;
       },
        
        pushTags : function(tag){
            tags.push(tag);
        }
    };
})

.factory('settingsFactory',function(){
	
	var settings = {mode_of_travelling:"",enableHighAccuracy:false};
	var aboutUs = "TagToFind is our first app of Knowvista company. This app is developed using Ionic and ngCordova. We will be happy to develop more such apps. If you have any project please contact us on knowvista.project@gmail.com";
					
	return{
		getAllSettings: function(){
			return settings;
		},
		
		set_mode_of_travelling : function(mode_of_travelling){
			settings.mode_of_travelling = mode_of_travelling;
		},
		
		setEnableHighAccuracy : function(enableHighAccuracy){
			settings.enableHighAccuracy = enableHighAccuracy;
		},
		getAboutUs  : function(){
			return aboutUs;
		}
	};
})
;