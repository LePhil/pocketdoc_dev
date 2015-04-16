(function(){
	
	var pocketdocData = angular.module('pocketdocData', []);
	
	pocketdocData.factory('DataService', function(){
		
		var DataService = {
			
			questions : function(){
				return [
					{
						"id": 1,
						"type": 1,
						"description": [
							{
								"lang": 1,
								"text": "Haben sie Fieber?"
							}, {
								"lang": 2,
								"text": "Do you have fever?"
							}
						],
						"answers": [
							{
								"id": 1,
								"desc": [
									{
										"lang": 1,
										"text": "Ja"
									}, {
										"lang": 2,
										"text": "Yes"
									}
								],
								"next_questions": [2]
							}, {
								"id": 2,
								"desc": [
									{
										"lang": 1,
										"text": "Nein"
									}, {
										"lang": 2,
										"text": "No"
									}
								],
								"next_questions": [3]
							}
						],
						"diagnosis": -1,
						"action_suggestion": -1
					}, {
						"id": 2,
						"type": 2, // Slider oder Dropdown
						"description": [
							{
								"lang": 1,
								"text": "Wie viel °C?"
							}, {
								"lang": 2,
								"text": "How much °C?"
							}
						],
						"answers": [
							{
								"id": 1,
								"desc": [
									{
										"lang": 1,
										"text": "37 - 38"
									}
								],
								"next_questions": [3]
							}, {
								"id": 2,
								"desc": [
									{
										"lang": 1,
										"text": "38 - 39"
									}
								],
								"next_questions": [4]
							}, {
								"id": 3,
								"desc": [
									{
										"lang": 1,
										"text": "39 - 40"
									}
								],
								"next_questions": [5]
							}, {
								"id": 4,
								"desc": [
									{
										"lang": 1,
										"text": "> 40"
									}
								],
								"next_questions": [6]
							}
						],
						"diagnosis": -1,
						"action_suggestion": -1
					}
				];
			},
			
			diagnoses : function(){
				return [
					{
						"id": 1,
						"short_desc": [
							{
								"lang": 1,
								"text": "Erkältung"
							}, {
								"lang": 2,
								"text": "Cold"
							}
						],
						"description": [
							{
								"lang": 1,
								"text": "Sie scheinen eine Erkältung zu haben."
							}, {
								"lang": 2,
								"text": "It seems you have a cold."
							}
						]
					}
				];
			},
			
			actionSuggestions : function(){
				return [
					{
						"id": 1,
						"description": [
							{
								"lang": 1,
								"text": "Bleiben sie zu Hause."
							}, {
								"lang": 2,
								"text": "Stay at home."
							}
						]
					}, {
						"id": 2,
						"description": [
							{
								"lang": 1,
								"text": "Suchen Sie einen Arzt auf."
							}, {
								"lang": 2,
								"text": "Go visit a doctor."
							}
						]
					}
				];
			},
			
			users : function(){
				return [
					{
						"id": 1,
						"name": "User123",
						"email": "user123@gmail.com",
						"password": "abcdefg",	// TODO: HASH!
						"gender": 1,
						"age_category": 3,
						"lang": 1
					}
				];
			},
			
			histories : function(){
				return [
					{
						"id": 1,
						"user_id": 1,
						"timestamp": "2015-04-10 09:12:34",
						"patient": {
							"self": true /* if false, here would be more information to the "treated" pationt, like name, age, ... */
						},
						"content": [
							{
								"type": "answer",
								"id": 1,
								"answer": 1
							}, {
								"type": "answer",
								"id": 2,
								"answer": 2
							}, {
								"type": "diagnosis",
								"id": 1,
								"accepted": true
							}, {
								"type": "actionSuggestion",
								"id": 1
							}
						]
					}
				];
				
			},
			
			languages : function(){
				return [
					{
						"id": 1,
						"desc"  : [
							{
								"lang": 1,
								"text": "Deutsch"
							}, {
								"lang": 2,
								"text": "German"
							}
						],
						"image": "german.png"
					}, {
						"id": 2,
						"desc"  : [
							{
								"lang": 1,
								"text": "Englisch"
							}, {
								"lang": 2,
								"text": "English"
							}
						],
						"image": "english.png"
					}
				];
			}
			
		};
		
		return DataService;
		
	});
	
})();