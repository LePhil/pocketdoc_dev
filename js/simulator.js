(function(){

	var backend = angular.module('pocketdocBackend', []);
	
	backend.factory('UserService', function(){
		
		var UserService = {
			
			// Data of User to save
			createUser : function(userData, success, error){
				
			},
			
			getUser : function(id, success, error){
				
			},
			
			// New Data of user to update
			updateUser : function(userData, success, error){
				
			},
			
			deleteUser : function(id, success, error){
				
			},
			
			loginUser : function(email, password, success, error){
				
			},
			
			logoutUser : function(id, success, error){
				
			}
			
		};
		
		return UserService;
		
	});
	
	backend.factory('HistoryService', function(){
		
		var HistoryService = {
			
			getUserHistory : function(userId, success, error){
				
			},
			
			getHistoryEntry : function(id, success, error){
				
			},
			
			deleteHistoryEntry : function(id, success, error){
				
			},
			
			// Data of History entry
			createHistoryEntry : function(userId, data, success, error){
				
			}
			
		};
		
		return HistoryService;
		
	});
	
	backend.factory('RunService', function(){
		
		var RunService = {
			
			// Personal data of user (gender, age, ...)
			startRun : function(userId, data, success, error){
				
			},
			
			answerQuestion : function(userId, answerId, success, error){
				
			},
			
			changeAnswer : function(userId, answerId, success, error){
				
			},
			
			acceptDiagnosis : function(success, error){
				
			}
		};
		
		return RunService;
		
	});
	
	backend.factory('FollowupService', function(){
		
		var FollowupService = {
			
			registerFollowup : function(userId, success, error){
				
			},
			
			startFollowup : function(id, success, error){
				
			},
			
			deleteFollowup : function(id, success, error){
				
			},
			
			getFollowups : function(userId, success, error){
				
			}
			
		};
		
		return FollowupService; 
		
	});
	
})();