(function(){

	var backend = angular.module('pocketdocBackend', []);
	
	backend.factory('UserService', function(){
		
		var UserService = {
						
			// Data of User to save
			createUser : function(userData, success, error){
				
				if (typeof(this.currentUser) !== "undefined")
					error("Ein Benutzer ist aktuell eingeloggt. Bitte zuerst ausloggen.")
				
				var users = localStorage.getItem("users");
				userData.id = users.length;
				
				users.push(userData);
				
				localStorage.setItem("users", userData);
				
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
	
	backend.factory('RunService', ['UserService', 'DataService', function(UserService, DataService){
		
		var RunService = {
			
			// Personal data of user (gender, age, ...)
			startRun : function(data, success, error){
				
				this.nextQuestions = [];
				getQuestionData(0, success, error);
				
			},
			
			answerQuestion : function(answer, success, error){
				
				this.nextQuestions.push(answer.next_questions);
				
				if (this.nextQuestions.length == 0)
					error("Ups, uns sind die Fragen ausgegangen.");
				
				getQuestionData(nextQuestions.pop(), success, error);
				
			},
			
			getQuestionData : function(questionId, success, error){
				
				var questions = DataService.questions();
				var firstQuestion = questions[questionId];
				
				var questionResult = {};
				
				var answerTexts = [];
				
				// Set type
				questionResult.type = firstQuestion.type;
				
				// Set Question Text 
				var questionText = firstQuestion.description[UserService.currentUser.lang].text;
				questionResult.description = questionText.text;
				
				// Set Answer Texts
				for(var i = 0; i < firstQuestion.answers.length; i++)
				{
					var desc = firstQuestion.answers[i].desc[UserService.currentUser.lang].text;
					answerTexts.push(
						{
							id : firstQuestion.answers[i].id,
							desc : desc.text,
							next_questions : firstQuestion.answers[i].next_questions
						}
					);
				}
				
				// Set Diagnosis
				if (firstQuestion.diagnosis >= 0)
				{
					var diagnosis = DataService.diagnoses[firstQuestion.diagnosis];
					questionResult.diagnosis = {
						short_desc : diagnosis.short_desc[UserService.currentUser.lang].text,
						description : diagnosis.description[UserService.currentUser.lang].text
					};
				}
				
				// Set Action suggestion
				if (firstQuestion.action_suggestion >= 0)
				{
					var action_suggestion = DataService.actionSuggestions[firstQuestion.action_suggestion];
					questionResult.action_suggestion = {
						description : action_suggestion.description[UserService.currentUser.lang].text
					};
				}
				
				success(questionResult);
				
			},
			
			changeAnswer : function(answerId, success, error){
				
			},
			
			acceptDiagnosis : function(success, error){
				
				// Aktueller Run aufräumen und beenden
				delete this.nextQuestions;
				
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
				return obj;
			}
			
		};
		
		return LanguageService;
		
	});
	
	
})();