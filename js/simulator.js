(function(){

	var backend = angular.module('pocketdocBackend', ['pocketdocData']);
	
	backend.factory('UserService', function(){
		
		var UserService = {
			
			currentUser : {
				id : -1,
				lang : 1
			},
			
			// Data of User to save
			createUser : function(userData, success, error){
				
				if (typeof(this.currentUser) !== "undefined")
					error("Ein Benutzer ist aktuell eingeloggt. Bitte zuerst ausloggen.")
				
				var users = localStorage.getItem("users");
				userData.id = users.length;
				
				users.push(userData);
				
				localStorage.setItem( "users", users );
				
				this.currentUser = userData;
				
				success(userData);
			},
			
			getUser : function(id, success, error){
				
				var users = localStorage.getItem("users");
				
				var user = $.grep(users, function(e){ return e.id == id; });
				
				if (user.length == 0)
					error("Id ist ungültig");
				else
					success(user[0]);
				
			},
			
			// New Data of user to update
			updateUser : function(userData, success, error){
				
			},
			
			deleteUser : function(id, success, error){
				
			},
			
			loginUser : function(email, password, success, error){
				
			},
			
			logoutUser : function(id, success, error){
				
			},

			checkUserData: function(userData, success, error) {
				
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
	
	backend.factory('RunService', ['UserService', 'DataService', 'LanguageService', 'UtilService', function(UserService, DataService, LanguageService, UtilService){
		
		var RunService = {
			
			// Personal data of user (gender, age, ...)
			startRun : function(data, success, error){
				
				this.nextQuestions = [];
				this.getQuestionData(1, success, error);
				
			},
			
			answerQuestion : function(data, success, error){
				
				var currQuestion = this.currentQuestion;
				var answerObj = UtilService.getElementById(data.answerId, currQuestion.answers );
				
				this.nextQuestions.push(answerObj.next_questions);
				
				if (this.nextQuestions.length == 0)
					error("Ups, uns sind die Fragen ausgegangen.");
				
				this.getQuestionData(this.nextQuestions.pop(), success, error);
				
			},
			
			getQuestionData : function(questionId, success, error){
				
				var questions = DataService.questions();
				var firstQuestion = UtilService.getElementById(questionId, questions);
				
				var questionResult = {};
				
				var answerTexts = [];
				
				this.currentQuestion = firstQuestion;
				
				// Set type
				questionResult.type = firstQuestion.type;
				
				// Set Question Text 
				var questionText = LanguageService.getCurrentLanguageObject(UserService.currentUser.lang, firstQuestion.description);
				questionResult.description = questionText.text;
				
				// Set Answer Texts
				for(var i = 0; i < firstQuestion.answers.length; i++)
				{
					var desc = LanguageService.getCurrentLanguageObject(UserService.currentUser.lang, firstQuestion.answers[i].desc);
					answerTexts.push(
						{
							id : firstQuestion.answers[i].id,
							desc : desc.text
						}
					);
				}
				
				questionResult.answers = answerTexts;
				
				// Set Diagnosis
				if (firstQuestion.diagnosis >= 0)
				{
					var diagnoses = DataService.diagnoses();
					var diagnosis = UtilService.getElementById(firstQuestion.diagnosis, diagnoses);
					questionResult.diagnosis = {
						short_desc : LanguageService.getCurrentLanguageObject(UserService.currentUser.lang, diagnosis.short_desc).text,
						description : LanguageService.getCurrentLanguageObject(UserService.currentUser.lang, diagnosis.description).text
					};
				}
				
				// Set Action suggestion
				if (firstQuestion.action_suggestion >= 0)
				{
					var action_suggestions = DataService.actionSuggestions();
					var action_suggestion = UtilService.getElementById(firstQuestion.action_suggestion, action_suggestions);
					questionResult.action_suggestion = {
						description : LanguageService.getCurrentLanguageObject(UserService.currentUser.lang, action_suggestion.description).text
					};
				}
				
				success(questionResult);
				
			},
			
			changeAnswer : function(answerId, success, error){
				
			},
			
			acceptDiagnosis : function(success, error){
				
				// Aktueller Run aufräumen und beenden
				delete this.nextQuestions;
				success();
			}
		};
		
		return RunService;
		
	}]);
	
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
	
	backend.factory('LanguageService', function(){
		
		var LanguageService = {
			
			getCurrentLanguageObject : function(langId, dataArray){
				
				var obj = $.grep(dataArray, function(e){ return e.lang == langId; });
				return obj[0];
			}
			
		};
		
		return LanguageService;
		
	});
	
	backend.factory('UtilService', function(){
		
		var UtilService = {
			
			getElementById : function(id, array){
				var obj = $.grep(array, function(e){ return e.id == id; });
				return obj[0];
			}
			
		};
		
		return UtilService;
		
	});
	
	
})();