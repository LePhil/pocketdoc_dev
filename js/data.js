(function(){
	
	var pocketdocData = angular.module('pocketdocData', []);
	
	pocketdocData.factory('DataService', function(){
		
		var DataService = {
			
			questions: function(){
				return [
					{
						"id": 0,
						"type": "list",
						"description": [
							{
								"lang": 0,
								"text": "Wann hat das Problem angefangen?"
							}, {
								"lang": 1,
								"text": "Since when do you have the problem?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "In den letzten 2 Stunden"
									}, {
										"lang": 1,
										"text": "In the last 2 hours"
									}
								], 
								"next_questions": [1]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "In den letzten 4 Stunden"
									}, {
										"lang": 1,
										"text": "In the last 4 hours"
									}
								],
								"next_questions": [1]
							}, {
								"id": 2,
								"desc": [
									{
										"lang": 0,
										"text": "In den letzten 8 Stunden"
									}, {
										"lang": 1,
										"text": "In the last 8 hours"
									}
								],
								"next_questions": [1]
							}, {
								"id": 3,
								"desc": [
									{
										"lang": 0,
										"text": "Innerhalb des letzten Tages"
									}, {
										"lang": 1,
										"text": "During the last day"
									}
								],
								"next_questions": [1]
							}, {
								"id": 4,
								"desc": [
									{
										"lang": 0,
										"text": "In den letzten 3 Tagen"
									}, {
										"lang": 1,
										"text": "In the last 3 days"
									}
								],
								"next_questions": [1]
							}, {
								"id": 5,
								"desc": [
									{
										"lang": 0,
										"text": "In der letzten Woche"
									}, {
										"lang": 1,
										"text": "In the last week"
									}
								],
								"next_questions": [1]
							}, {
								"id": 6,
								"desc": [
									{
										"lang": 0,
										"text": "In den letzten 2 Wochen"
									}, {
										"lang": 1,
										"text": "In the last 2 weeks"
									}
								],
								"next_questions": [1]
							}, {
								"id": 7,
								"desc": [
									{
										"lang": 0,
										"text": "Vor mehr als 2 Wochen"
									}, {
										"lang": 1,
										"text": "More than 2 weeks ago"
									}
								],
								"next_questions": [1]
							}
						]
					}, {
						"id": 1,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Haben Sie Fieber?"
							}, {
								"lang": 1,
								"text": "Do you have a temperature?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [2]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [3]
							}
						]
					}, {
						"id": 2,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Hohes Fieber?"
							}, {
								"lang": 1,
								"text": "High Temperature?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [3]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [3]
							}
						]
					}, {
						"id": 3,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Haben Sie Schmerzen?"
							}, {
								"lang": 1,
								"text": "Do you have pain?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [4]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [15]
							}
						]
					}, {
						"id": 4,
						"type": "list",
						"description": [
							{
								"lang": 0,
								"text": "Wie stark sind die Schmerzen?"
							}, {
								"lang": 1,
								"text": "How strong is the pain?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Sehr schwach"
									}, {
										"lang": 1,
										"text": "Very weak"
									}
								],
								"next_questions": [5]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Schwach"
									}, {
										"lang": 1,
										"text": "Weak"
									}
								],
								"next_questions": [5]
							}, {
								"id": 2,
								"desc": [
									{
										"lang": 0,
										"text": "Stark"
									}, {
										"lang": 1,
										"text": "Strong"
									}
								],
								"next_questions": [8]
							}, {
								"id": 3,
								"desc": [
									{
										"lang": 0,
										"text": "Sehr stark"
									}, {
										"lang": 1,
										"text": "Very strong"
									}
								],
								"next_questions": [7]
							}
						]
					}, {
						"id": 5,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Haben Sie Sodbrennen?"
							}, {
								"lang": 1,
								"text": "Do you experience heartburn?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [6]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [6]
							}
						]
					}, {
						"id": 6,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Handelt es sich um Kopfschmerzen?"
							}, {
								"lang": 1,
								"text": "Are you experiencing headaches?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [9],
								"diagnosis": 0,
								"action_suggestion": 3
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [9]
							}
						],
						"diagnosis": 0,
						"action_suggestion": 3
					}, {
						"id": 7,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Sind die Schmerzen stetig und ununterbrochen da?"
							}, {
								"lang": 1,
								"text": "Is the pain static and always there?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [15]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [15]
							}
						]
					}, {
						"id": 8,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Sind die Schmerzen stetig und ununterbrochen da?"
							}, {
								"lang": 1,
								"text": "Is the pain static and always there?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [10]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [15]
							}
						]
					}, {
						"id": 9,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Sind die Schmerzen stetig und ununterbrochen da?"
							}, {
								"lang": 1,
								"text": "Is the pain static and always there?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [11]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [15]
							}
						]
					}, {
						"id": 10,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Gibt es etwas, was die Schmerzen viel schlimmer werden lässt?"
							}, {
								"lang": 1,
								"text": "Is there anything that makes the pain worse?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [13]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [13]
							}
						]
					}, {
						"id": 11,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Gibt es etwas, was die Schmerzen viel schlimmer werden lässt?"
							}, {
								"lang": 1,
								"text": "Is there anything that makes the pain worse?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [12]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [12]
							}
						]
					}, {
						"id": 12,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Leiden Sie unter Nackenschmerzen?"
							}, {
								"lang": 1,
								"text": "Do you suffer from neck pain?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [13],
								"diagnosis": 2,
								"action_suggestion": 2
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [13]
							}
						]
					}, {
						"id": 13,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Haben Sie Husten?"
							}, {
								"lang": 1,
								"text": "Do you have a cough?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [14]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [14]
							}
						]
					}, {
						"id": 14,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Haben Sie Brustschmerzen?"
							}, {
								"lang": 1,
								"text": "Do you have chest pain?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [15],
								"diagnosis": 1,
								"action_suggestion": 1
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [15]
							}
						]
					}, {
						"id": 15,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Haben Sie Auswurf?"
							}, {
								"lang": 1,
								"text": "Are you having sputum?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [16]
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [16]
							}
						]
					}, {
						"id": 16,
						"type": "yesnomaybe",
						"description": [
							{
								"lang": 0,
								"text": "Haben Sie viel Auswurf?"
							}, {
								"lang": 1,
								"text": "Do you have a lot of sputum?"
							}
						],
						"answers": [
							{
								"id": 0,
								"desc": [
									{
										"lang": 0,
										"text": "Ja"
									}, {
										"lang": 1,
										"text": "Yes"
									}
								],
								"style": "md-accent",
								"next_questions": [16],
								"diagnosis": 1,
								"action_suggestion": 1
							}, {
								"id": 1,
								"desc": [
									{
										"lang": 0,
										"text": "Nein"
									}, {
										"lang": 1,
										"text": "No"
									}
								],
								"style": "md-warn",
								"next_questions": [16],
								"diagnosis": 1,
								"action_suggestion": 1
							}
						]
					}
				];
			},
			
			diagnoses: function(){
				return [
					{
						"id": 0,
						"short_desc": [
							{
								"lang": 0,
								"text": "Zu wenig getrunken"
							}, {
								"lang": 1,
								"text": "drank too little"
							}
						],
						"description": [
							{
								"lang": 0,
								"text": "Sie haben möglicherweise zu wenig getrunken."
							}, {
								"lang": 1,
								"text": "You probably haven't drunken enough."
							}
						]
					}, {
						"id": 1,
						"short_desc": [
							{
								"lang": 0,
								"text": "Lungenentzündung"
							}, {
								"lang": 1,
								"text": "Pneumonia"
							}
						],
						"description": [
							{
								"lang": 0,
								"text": "Sie könnten eine Lungenentzündung haben."
							}, {
								"lang": 1,
								"text": "You could suffer from Pneumonia."
							}
						]
					}, {
						"id": 2,
						"short_desc": [
							{
								"lang": 0,
								"text": "Spannungskopfschmerzen"
							}, {
								"lang": 1,
								"text": "Tension Headache"
							}
						],
						"description": [
							{
								"lang": 0,
								"text": "Sie könnten an Spannungskopfschmerzen leiden. Diese Kopfschmerzen werden durch muskuläre Verspannungen verursacht."
							}, {
								"lang": 1,
								"text": "You could suffer from tension headaches. This can be caused by muscle tension or lack of sleep."
							}
						]
					}
				];
			},
			
			actionSuggestions: function(){
				return [
					{
						"id": 0,
						"description": [
							{
								"lang": 0,
								"text": "Behandeln Sie sich zu Hause."
							}, {
								"lang": 1,
								"text": "Stay at home."
							}
						]
					}, {
						"id": 1,
						"description": [
							{
								"lang": 0,
								"text": "Suchen Sie einen Arzt auf."
							}, {
								"lang": 1,
								"text": "Go visit a doctor."
							}
						]
					}, {
						"id": 2,
						"description": [
							{
								"lang": 0,
								"text": "Sie können sich selber behandeln. Nehmen Sie ein Schmerzmittel, wie Aspirin oder Dafalgan. Falls dies nicht hilft oder sich die Symptome verstärken empfehlen wir Ihnen, trotzdem einen Arzt aufzusuchen."
							}, {
								"lang": 1,
								"text": "You can treat yourself. Take an Aspirine or Dafalgan. If that doesn't seem to work, we recommend that you visit a doctor."
							}
						]
					}, {
						"id": 3,
						"description": [
							{
								"lang": 0,
								"text": "Trinken Sie mehr Wasser."
							}, {
								"lang": 1,
								"text": "Drink more water."
							}
						]
					}
				];
			},
			
			users: function(){
				return [
					{
						"id": 0,
						"name": "User123",
						"email": "user123@gmail.com",
						"password": "abcdefg",
						"gender": 0,
						"age_category": 3,
						"lang": 0
					}, {
						"id": 1,
						"name": "Alfred",
						"email": "alfred@waynemanor.com",
						"password": "batsbatsbats",
						"gender": 0,
						"age_category": 6,
						"lang": 0
					}
				];
			},
			
			histories: function(){
				return [
					{
						"id": 0,
						"user_id": 0,
						"timestamp": "2015-04-10 09:12:34",
						"patient": {
							"self": true /* if false, here would be more information to the "treated" pationt, like name, age, ... */
						},
						"content": [
							{
								"type": "answer",
								"id": 0,
								"answer": 0
							}, {
								"type": "answer",
								"id": 1,
								"answer": 1
							}, {
								"type": "diagnosis",
								"id": 2,
								"accepted": true
							}, {
								"type": "actionSuggestion",
								"id": 0
							}
						]
					}
				];
			},
			
			languages: function(){
				return [
					{
						"id": 0,
						"locale": "de"
					}, {
						"id": 1,
						"locale": "en"
					}
				];
			}
			
		};
		
		return DataService;
		
	});
	
})();