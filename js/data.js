(function(){
	
	var pocketdocData = angular.module('pocketdocData', []);
	
	pocketdocData.factory('DataService', function(){
		
		var DataService = {
			
			questions : function(){
				return [
					{
						"id"				: 1,
						"type"				: 2, // Dropdown
						"description"		: [
							{
								"lang"	: 1,
								"text"	: "Wann hat das Problem angefangen?"
							},
							{
								"lang"	: 2,
								"text"	: "Since when do you have the problem?"
							}
						],
						"answers"			: [
							{
								"id"				: 1,
								"desc"				: [
									{
										"lang"	: 1,
										"text"	: "2 Stunden"
									},
									{
										"lang"	: 2,
										"text"	: "2 hours"
									}
								],
								"next_questions"	: [2]
							},
							{
								"id"				: 2,
								"desc"			: [
									{
										"lang"	: 1,
										"text"	: "4 Stunden"
									},
									{
										"lang"	: 2,
										"text"	: "4 hours"
									}
								],
								"next_questions"	: [2]
							},
							{
								"id"				: 3,
								"desc"			: [
									{
										"lang"	: 1,
										"text"	: "1 Tag"
									},
									{
										"lang"	: 2,
										"text"	: "1 day"
									}
								],
								"next_questions"	: [2]
							},
							{
								"id"				: 4,
								"desc"			: [
									{
										"lang"	: 1,
										"text"	: "3 Tage"
									},
									{
										"lang"	: 2,
										"text"	: "3 days"
									}
								],
								"next_questions"	: [2]
							},
							{
								"id"				: 5,
								"desc"			: [
									{
										"lang"	: 1,
										"text"	: "1 Woche"
									},
									{
										"lang"	: 2,
										"text"	: "1 week"
									}
								],
								"next_questions"	: [2]
							},
							{
								"id"				: 6,
								"desc"			: [
									{
										"lang"	: 1,
										"text"	: "2 Wochen"
									},
									{
										"lang"	: 2,
										"text"	: "2 weeks"
									}
								],
								"next_questions"	: [2]
							},
							{
								"id"				: 7,
								"desc"			: [
									{
										"lang"	: 1,
										"text"	: "Mehr als 2 Wochen"
									},
									{
										"lang"	: 2,
										"text"	: "More than 2 weeks"
									}
								],
								"next_questions"	: [2]
							}
						],
						"diagnosis"			: -1,
						"action_suggestion"	: -1
					},
					{
						"id"				: 2,
						"type"				: 1,
						"description"		: [
							{
								"lang"	: 1,
								"text"	: "Haben Sie Fieber?"
							},
							{
								"lang"	: 2,
								"text"	: "Do you have a temperature?"
							}
						],
						"answers"			: [
							{
								"id"				: 1,
								"desc"				: [
									{
										"lang"	: 1,
										"text"	: "Ja"
									},
									{
										"lang"	: 2,
										"text"	: "Yes"
									}
								],
								"next_questions"	: [3]
							},
							{
								"id"				: 2,
								"desc"				: [
									{
										"lang"	: 1,
										"text"	: "Nein"
									},
									{
										"lang"	: 2,
										"text"	: "No"
									}
								],
								"next_questions"	: [3]
							}
						],
						"diagnosis"			: 1,
						"action_suggestion"	: 1
					},
					{
						"id"				: 3,
						"type"				: 1,
						"description"		: [
							{
								"lang"	: 1,
								"text"	: "Haben Sie Schmerzen?"
							},
							{
								"lang"	: 2,
								"text"	: "Do you have pain?"
							}
						],
						"answers"			: [
							{
								"id"				: 1,
								"desc"				: [
									{
										"lang"	: 1,
										"text"	: "Ja"
									},
									{
										"lang"	: 2,
										"text"	: "Yes"
									}
								],
								"next_questions"	: [4]
							},
							{
								"id"				: 2,
								"desc"				: [
									{
										"lang"	: 1,
										"text"	: "Nein"
									},
									{
										"lang"	: 2,
										"text"	: "No"
									}
								],
								"next_questions"	: [7]
							}
						],
						"diagnosis"			: -1,
						"action_suggestion"	: -1
					},
					{
						"id"				: 4,
						"type"				: 3, // Slider
						"description"		: [
							{
								"lang"	: 1,
								"text"	: "Wie stark sind die Schmerzen?"
							},
							{
								"lang"	: 2,
								"text"	: "How strong is the pain?"
							}
						],
						"answers"			: [
							{
								"id"				: 1,
								"desc"				: [
									{
										"lang"	: 1,
										"text"	: "Schwach"
									},
									{
										"lang"	: 2,
										"text"	: "Weak"
									}
								],
								"next_questions"	: [5]
							},
							{
								"id"				: 2,
								"desc"			: [
									{
										"lang"	: 1,
										"text"	: "Mittel"
									},
									{
										"lang"	: 2,
										"text"	: "Medium"
									}
								],
								"next_questions"	: [5]
							},
							{
								"id"				: 3,
								"desc"			: [
									{
										"lang"	: 1,
										"text"	: "Stark"
									},
									{
										"lang"	: 2,
										"text"	: "Strong"
									}
								],
								"next_questions"	: [5]
							}
						],
						"diagnosis"			: -1,
						"action_suggestion"	: -1
					},
					{
						"id"				: 5,
						"type"				: 1,
						"description"		: [
							{
								"lang"	: 1,
								"text"	: "Sind die Schmerzen stetig und ununterbrochen da?"
							},
							{
								"lang"	: 2,
								"text"	: "Is the pain static and always there?"
							}
						],
						"answers"			: [
							{
								"id"				: 1,
								"desc"				: [
									{
										"lang"	: 1,
										"text"	: "Ja"
									},
									{
										"lang"	: 2,
										"text"	: "Yes"
									}
								],
								"next_questions"	: [6]
							},
							{
								"id"				: 2,
								"desc"				: [
									{
										"lang"	: 1,
										"text"	: "Nein"
									},
									{
										"lang"	: 2,
										"text"	: "No"
									}
								],
								"next_questions"	: [6]
							}
						],
						"diagnosis"			: -1,
						"action_suggestion"	: -1
					},
					{
						"id"				: 6,
						"type"				: 1,
						"description"		: [
							{
								"lang"	: 1,
								"text"	: "Gibt es etwas, was die Schmerzen viel schlimmer werden lässt?"
							},
							{
								"lang"	: 2,
								"text"	: "Is there anything that makes the pain worse?"
							}
						],
						"answers"			: [
							{
								"id"				: 1,
								"desc"				: [
									{
										"lang"	: 1,
										"text"	: "Ja"
									},
									{
										"lang"	: 2,
										"text"	: "Yes"
									}
								],
								"next_questions"	: [7]
							},
							{
								"id"				: 2,
								"desc"				: [
									{
										"lang"	: 1,
										"text"	: "Nein"
									},
									{
										"lang"	: 2,
										"text"	: "No"
									}
								],
								"next_questions"	: [7]
							}
						],
						"diagnosis"			: -1,
						"action_suggestion"	: -1
					},
					{
						"id"				: 7,
						"type"				: 1,
						"description"		: [
							{
								"lang"	: 1,
								"text"	: "Haben Sie Husten?"
							},
							{
								"lang"	: 2,
								"text"	: "Do you have a cough?"
							}
						],
						"answers"			: [
							{
								"id"				: 1,
								"desc"				: [
									{
										"lang"	: 1,
										"text"	: "Ja"
									},
									{
										"lang"	: 2,
										"text"	: "Yes"
									}
								],
								"next_questions"	: [7]
							},
							{
								"id"				: 2,
								"desc"				: [
									{
										"lang"	: 1,
										"text"	: "Nein"
									},
									{
										"lang"	: 2,
										"text"	: "No"
									}
								],
								"next_questions"	: [7]
							}
						],
						"diagnosis"			: 2,
						"action_suggestion"	: 1
					}
				];
			},
			
			diagnoses : function(){
				return [
					{
						"id"			: 1,
						"short_desc"	: [
							{
								"lang"	: 1,
								"text"	: "Erkältung"
							},
							{
								"lang"	: 2,
								"text"	: "Cold"
							}
						],
						"description"	: [
							{
								"lang"	: 1,
								"text"	: "Akute, durch Viren verursachte Erkältung."
							},
							{
								"lang"	: 2,
								"text"	: "It seems you have a cold."
							}
						]
					},
					{
						"id"			: 2,
						"short_desc"	: [
							{
								"lang"	: 1,
								"text"	: "Spannungskopfschmerzen"
							},
							{
								"lang"	: 2,
								"text"	: "Headache"
							}
						],
						"description"	: [
							{
								"lang"	: 1,
								"text"	: "Sie können an Spannungskopfschmerzen leiden. Diese Kopfschmerzen werden durch muskuläre Verspannungen verursacht. Sie können sich selber behandeln. Nehmen Sie ein Schmerzmittel, wie Aspirin oder Dafalgan."
							},
							{
								"lang"	: 2,
								"text"	: "You have a headache."
							}
						]
					}
				];
			},
			
			actionSuggestions : function(){
				return [
					{
						"id"			: 1,
						"description"	: [
							{
								"lang"	: 1,
								"text"	: "Behandeln Sie sich zu Hause."
							},
							{
								"lang"	: 2,
								"text"	: "Stay at home."
							}
						]
					},
					{
						"id"			: 2,
						"description"	: [
							{
								"lang"	: 1,
								"text"	: "Suchen Sie einen Arzt auf."
							},
							{
								"lang"	: 2,
								"text"	: "Go visit a doctor."
							}
						]
					}
				];
			},
			
			users : function(){
				return [
					{
						"id"			: 1,
						"name"			: "User123",
						"email"			: "user123@gmail.com",
						"password"		: "abcdefg",
						"gender"		: 1,
						"age_category"	: 3,
						"lang"			: 1
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