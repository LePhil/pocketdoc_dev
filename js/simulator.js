(function(){

	var backend = angular.module('pocketdocBackend', ['pocketdocData']);
	
	backend.factory('UserService', function(){
		
		var currentUser = {
				id : -1,
				lang : 1
		};
		
		var create = function(data, success, error){
				
			if (typeof(currentUser) !== "undefined")
				error("Ein Benutzer ist aktuell eingeloggt. Bitte zuerst ausloggen.")
			
			var users = localStorage.getItem("users");

			if ( users.length > 0 ) {
				data.id = _.max(users, function(user){ return user.id; }) + 1;	//get highest ID and add 1.
			} else {
				data.id = 1;	//neat, first user!
			}
			
			users.push(data);
			
			localStorage.setItem( "users", users );
			
			currentUser = data;
			
			success(data);
		};
		
		var get = function(data, success, error){
				
			var users = localStorage.getItem("users");
			
			var user = $.grep(users, function(e){ return e.id == data.id; });
			
			if (user.length == 0)
				error("Id ist ungültig");
			else
				success(user[0]);
			
		};
		
		var update = function(data, success, error){
			
		};
		
		var del = function(data, success, error){
			
		};
		
		var login = function(data, success, error){
			
		};
		
		var logout = function(data, success, error){
			
		};
		
		var checkData = function(data, success, error){
			
		};
		
		var getCurrent = function(){
			return currentUser;
		}
		
		return {
			createUser : create,
			getUser : get,
			updateUser : update,
			deleteUser : del,
			loginUser : login,
			logoutUser : logout,
			checkUserData : checkData,
			getCurrentUser : getCurrent
		};
		
	});
	
	backend.factory('HistoryService', function(){
		
		var get = function(data, success, error){
			
		};
		
		var getEntry = function(data, success, error){
			
		};
		
		var del = function(data, success, error){
			
		};
		
		var create = function(data, success, error){
			
		};
		
		return {
			getUserHistory : get,
			getHistoryEntry : getEntry,
			deleteHistoryEntry : del,
			createHistoryEntry : create
		};
				
	});
	
	backend.factory('RunService', ['UserService', 'DataService', 'UtilService', function(UserService, DataService, UtilService){
		
		var nextQuestions = [];
		var currentQuestion;
		
		
		var start = function(data, success, error){
			getQ(1, success, error);
		};
		
		var answerQ = function(data, success, error){
				
			var currQuestion = currentQuestion;
			var answerObj = UtilService.getElementById(data.answerId, currQuestion.answers );
			
			nextQuestions.push(answerObj.next_questions);
			
			if (nextQuestions.length == 0)
				error("Ups, uns sind die Fragen ausgegangen.");
			
			getQ(nextQuestions.pop(), success, error);
			
		};
		
		var getQ = function(questionId, success, error){
				
			var questions = DataService.questions();
			var firstQuestion = UtilService.getElementById(questionId, questions);
			
			var questionResult = {};
			
			var answerTexts = [];
			
			currentQuestion = firstQuestion;
			
			// Set type
			questionResult.type = firstQuestion.type;
			
			// Set Question Text 
			var questionText = UtilService.getCurrentLanguageObject(UserService.getCurrentUser().lang, firstQuestion.description);
			questionResult.description = questionText.text;
			
			// Set Answer Texts
			for(var i = 0; i < firstQuestion.answers.length; i++)
			{
				var desc = UtilService.getCurrentLanguageObject(UserService.getCurrentUser().lang, firstQuestion.answers[i].desc);
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
					short_desc : UtilService.getCurrentLanguageObject(UserService.getCurrentUser().lang, diagnosis.short_desc).text,
					description : UtilService.getCurrentLanguageObject(UserService.getCurrentUser().lang, diagnosis.description).text
				};
			}
			
			// Set Action suggestion
			if (firstQuestion.action_suggestion >= 0)
			{
				var action_suggestions = DataService.actionSuggestions();
				var action_suggestion = UtilService.getElementById(firstQuestion.action_suggestion, action_suggestions);
				questionResult.action_suggestion = {
					description : UtilService.getCurrentLanguageObject(UserService.getCurrentUser().lang, action_suggestion.description).text
				};
			}
			
			success(questionResult);
			
		};
		
		var change = function(data, success, error){
		};
		
		var acceptDiag = function(data, success, error){
			
			// Aktueller Run aufräumen und beenden
			delete nextQuestions;
			success();
		};
		
		return {
			startRun : start,
			answerQuestion : answerQ,
			getQuestionData : getQ,
			changeAnswer : change,
			acceptDiagnosis : acceptDiag
		};
		
	}]);
	
	backend.factory('FollowupService', function(){
		
		var register = function(data, success, error){
			
		};
		
		var start = function(data, success, error){
			
		};
		
		var del = function(data, success, error){
			
		};
		
		var get = function(data, success, error){
			
		};
		
		return {
			registerFollowup : register,
			startFollowup : start,
			deleteFollowup : del,
			getFollowups : get
		};
		
	});
	
	backend.factory('UtilService', function(){
		
		var UtilService = {
			
			getElementById : function(id, array){
				var obj = $.grep(array, function(e){ return e.id == id; });
				return obj[0];
			},
			
			getCurrentLanguageObject : function(langId, dataArray){
				var obj = $.grep(dataArray, function(e){ return e.lang == langId; });
				return obj[0];
			}
			
		};
		
		return UtilService;
		
	});
	
	
})();