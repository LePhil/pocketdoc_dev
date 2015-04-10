(function(){
	
	var pocketdocData = angular.module('pocketdocData', []);
	
	pocketdocData.factory('DataService', function(){
		
		var DataService = {
			
			questions : function(){
				return [
					{
						"id"				: 1,
						"type"				: 1,
						"description"		: [
							{
								"lang"	: 1,
								"text"	: "Haben sie Fieber?"
							},
							{
								"lang"	: 2,
								"text"	: "Do you have fever?"
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
								"next_questions"	: [2,5]
							},
							{
								"id"				: 2,
								"desc"			: [
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
						"diagnosis"			: -1,
						"action_suggestion"	: -1
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
								"text"	: "Sie scheinen eine Erkältung zu haben."
							},
							{
								"lang"	: 2,
								"text"	: "It seems you have a cold."
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
								"text"	: "Bleiben sie zu Hause."
							},
							{
								"lang"	: 2,
								"text"	: "Stay at home."
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
						"id"				: 1,
						"user_id"			: 1,
						"timestamp"			: "2015-04-10",
						"different_person"	: false,
						"diagnosis"			: {
							"id"				: 1,
							"description"		: [
								{
									"lang"			: 1,
									"text"			: "Erkältung"
								},
								{
									"lang"			: 2,
									"text"			: "Cold"
								}
							]
						},
						"questions"			: [
							{
								"description"		: [
									{
										"lang"	: 1,
										"text"	: "Haben sie Fieber?"
									},
									{
										"lang"	: 2,
										"text"	: "Do you have fever?"
									}
								],
								"answer"			: {
									"desc"				: [
										{
											"lang"	: 1,
											"text"	: "ja"
										},
										{
											"lang"	: 2,
											"text"	: "yes"
										}
									]
								}
							}
						]
						
					}
				];
				
			}
			
			languages : function(){
				return [
					{
						"id"	: 1,
						"image"	: "german.png"
					},
					{
						"id"	: 2,
						"image"	: "english.png"
					}
				];
			}
			
		};
		
		return DataService;
		
	});
	
})();