(function(){

	var backend = angular.module('pocketdocBackend', []);
	
	backend.factory('UserService', function(){
		
		var UserService = {
			
			// Userhandling
			createUser : function(userData){
				
			},
			
			getUser : function(id){
				
			},
			
			updateUser : function(userData){
				
			},
			
			deleteUser : function(id){
				
			}
			
			
			
			// Run
			getNextQuestion : function(){
				
			},
			
			answerQuestion : function(answer){
				
			},
			
		};
		
		return UserService;
		
	});
	
	backend.factory('HistoryService', function(){
		
		var HistoryService = {
			
			// History
			getUserHistory : function(userId){
				
			},
			
			getHistoryEntry : function(id){
				
			},
			
			deleteHistoryEntry : function(id){
				
			}
			
		};
		
		return HistoryService;
		
	});
	
	backend.factory('RunService', function(){
		
		var RunService = {
			
			// History
			getUserHistory : function(userId){
				
			},
			
			getHistoryEntry : function(id){
				
			},
			
			deleteHistoryEntry : function(id){
				
			}
			
		};
		
		return RunService;
		
	});
	
})();