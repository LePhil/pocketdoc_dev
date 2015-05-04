(function(){

	var backend = angular.module('pocketdocBackend', ['pocketdocData']);
	
	backend.factory('UserService', ['DataService', function(DataService){
		
		var currentUser = {
				id : -1,
				lang : 'de'
		};
		
		var create = function(data, success, error){
			if (currentUser.id !== -1) {
				error("Ein Benutzer ist aktuell eingeloggt. Bitte zuerst ausloggen.");
			}
			{
				var users = JSON.parse(localStorage.getItem("users"));

				if ( users != null && users.length > 0 ) {
					data.id = _.max(users, function(user){ return user.id; }).id + 1;	//get highest ID and add 1.
				} else {
					users = [];
					data.id = 1;	//neat, first user!
				}
				
				users.push(data);
				
				localStorage.setItem( "users", angular.toJson(users) );
				
				currentUser = data;
				delete currentUser.password;
				
				success(data);
			}
		};
		
		var get = function(data, success, error){
				
			var users = JSON.parse(localStorage.getItem("users"));
			
			var user = $.grep(users, function(e){ return e.id == data.id; });
			
			if (user.length == 0)
				error("Id ist ungültig");
			else
			{
				delete user[0].password
				success(user[0]);
			}
			
		};
		
		var update = function(data, success, error){
			var users = JSON.parse(localStorage.getItem("users"));
			var user = $.grep(users, function(e){ return e.id == data.id; })[0];
			
			if ((typeof(data.oldPassword) !== "undefined" && data.oldPassword !== "") && data.oldPassword !== user.password)
			{
				error("Das eingegebene Passwort ist fehlerhaft!");
				return;
			}
			
			if (typeof(data.newPassword) !== "undefined" && data.newPassword !== ""){
				data.password = data.newPassword;
				delete data.newPassword;
				delete data.oldPassword;
			}
			else{
				data.password = user.password;
			}
			
			users = $.grep(users, function(e){ return e.id != data.id; });
			users.push(data);
			
			localStorage.setItem( "users", angular.toJson(users) );
			
			currentUser = data;
			delete currentUser.password;
			
			success({
				name: data.name,
				lang: data.lang
			});
			
		};
		
		var del = function(data, success, error){
			var name = currentUser.name;
			var users = JSON.parse(localStorage.getItem("users"));
			var leftUsers = $.grep(users, function(e){ return e.id != currentUser.id; });
			
			if ((users.length - 1) === leftUsers.length)
			{
				localStorage.setItem( "users", angular.toJson(leftUsers) );
				
				currentUser = {
					id: -1,
					lang: currentUser.lang
				}
				
				success({
					name : name
				});
			}
			else
				error("Fehler beim löschen des Benutzers!");
		};
		
		var login = function(data, success, error){
			var users = JSON.parse( localStorage.getItem("users") ),
				user = $.grep( users, function( e ){
					// check if user exists by comparing the emails.
					return e.email == data.email;
				} );
			
			if (user.length === 1){
				if (data.password === user[0].password){
					currentUser = user[0];
					delete currentUser.password;
					
					success({
						name : currentUser.name
					});
				} else {
					error("Falsches Passwort!");
				}
			} else {
				error("Benutzer nicht gefunden");
			}
		};
		
		var logout = function(data, success, error){
			
			var userName = currentUser.name;
			
			currentUser = {
				id : -1,
				lang : currentUser.lang,
			};
			
			success({name : userName});
		};
		
		var checkData = function(data, success, error){
			
		};
		
		var getCurrent = function(){
			return currentUser;
		};
		
		var updateLang = function(data, success, error){
			currentUser.lang = data.lang;
			success(
				{
					lang: currentUser.lang
				}
			);
		};
		
		var isInUse = function(data, success, error){
			var users = JSON.parse(localStorage.getItem("users"));
			
			if (users == null)
				success({inUse: false});
			else{
				var user = $.grep(users, function(e){ return e.email == data.email; });
			
				if (user.length == 0)
					success({inUse: false});
				else
					success({inUse: true});
			}
		};
		
		return {
			createUser : create,
			getUser : get,
			updateUser : update,
			deleteUser : del,
			loginUser : login,
			logoutUser : logout,
			checkUserData : checkData,
			getCurrentUser : getCurrent,
			updateLanguage : updateLang,
			isEmailInUse : isInUse
		};
		
	}]);
	
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
			getQ(0, success, error);
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
			var langId = UtilService.getIdByLocale(UserService.getCurrentUser().lang, DataService.languages());
			var questionText = UtilService.getCurrentLanguageObject(langId, firstQuestion.description);
			questionResult.description = questionText.text;
			
			// Set Answer Texts
			for(var i = 0; i < firstQuestion.answers.length; i++)
			{
				var desc = UtilService.getCurrentLanguageObject(langId, firstQuestion.answers[i].desc);
				answerTexts.push(
					{
						id : firstQuestion.answers[i].id,
						desc : desc.text,
						style: firstQuestion.answers[i].style || ""
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
					short_desc : UtilService.getCurrentLanguageObject(langId, diagnosis.short_desc).text,
					description : UtilService.getCurrentLanguageObject(langId, diagnosis.description).text
				};
			}
			
			// Set Action suggestion
			if (firstQuestion.action_suggestion >= 0)
			{
				var action_suggestions = DataService.actionSuggestions();
				var action_suggestion = UtilService.getElementById(firstQuestion.action_suggestion, action_suggestions);
				questionResult.action_suggestion = {
					description : UtilService.getCurrentLanguageObject(langId, action_suggestion.description).text
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
			},
			
			getLocaleById : function(langId, dataArray){
				var obj = $.grep(dataArray, function(e){ return e.id == langId; });
				return obj[0].locale;
			},
			
			getIdByLocale : function(localeId, dataArray){
				var obj = $.grep(dataArray, function(e){ return e.locale == localeId; });
				return obj[0].id;
			}
			
		};
		
		return UtilService;
		
	});
	
	
})();