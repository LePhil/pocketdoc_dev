'use strict';

describe('Simulator tests', function() {

	var defaultUser = {
		email: 'test@test.ch',
		password: 'test',
		name: 'test',
		gender: '0',
		age_category: '0',
		lang: 'de'
	};
	
	// load modules
	beforeEach(module('pocketdocApp'));
	
	// Cleaar data
	afterEach(function(){
		localStorage.clear();
	});
	
	// Test UserService availability
	it('check the existence of User Service', inject(function(UserService) {
		expect(UserService).toBeDefined();
	}));

	it('check if user is logged out by default', inject(function(UserService) {
		expect(UserService.isLoggedIn()).toBe(false);
	}));
	
	it('Create User and check if logged in', inject(function(UserService) {
		
		UserService.createUser(
			defaultUser,
			function(data){
				expect(UserService.isLoggedIn()).toBe(true);
			},
			function(error){
				expect(true).toThrow(new Error("Create failed!"));
			}
		);
		
	}));
	
	it('Email in use', inject(function(UserService) {
		
		UserService.createUser(
			defaultUser,
			function(data){
				UserService.isEmailInUse(
					{
						email: 'test@test.ch'
					},
					function(data){
						expect(data.inUse).toBe(true);
					},
					function(error){
						expect(true).toThrow(new Error("Is Email in use failed!"));
					}
				);
			},
			function(error){
				expect(true).toThrow(new Error("Create in is Email in use failed!"));
			}
		);
		
	}));
	
	// Test RunService availability
	it('check the existence of Run Service', inject(function(RunService) {
		expect(RunService).toBeDefined();
	}));

	// Test DiagnosisService availability
	it('check the existence of Diagnosis Service', inject(function(DiagnosisService) {
		expect(DiagnosisService).toBeDefined();
	}));
	
	// Test FollowUpService availability
	it('check the existence of Followup Service', inject(function(FollowupService) {
		expect(FollowupService).toBeDefined();
	}));
	
	// Test MetaDataService availability
	it('check the existence of Meta Data Service', inject(function(MetaDataService) {
		expect(MetaDataService).toBeDefined();
	}));
	
	it('check the existence of language data', inject(function(MetaDataService) {
		expect(MetaDataService.getLanguages()).toBeDefined();
	}));
	
	it('check the existence of age ranges', inject(function(MetaDataService) {
		expect(MetaDataService.getAgeRanges()).toBeDefined();
	}));
	
	// Test UtilService availability
	it('check the existence of Util Service', inject(function(UtilService) {
		expect(UtilService).toBeDefined();
	}));
	
	it('Check getElementById function', inject(function(UtilService) {
		var data =	[
			{id : 3},
			{id : 2},
			{id : 1},
			{id : 0}
		];
		
		expect(UtilService.getElementById(
			2,
			data
		)).toBe(data[1]);
	}));
	
	it('Check getCurrentLanguageObject function', inject(function(UtilService) {
		var data =	[
			{value : 'de', lang: 0},
			{value : 'en', lang: 1},
			{value : 'fr', lang: 2},
			{value : 'es', lang: 3},
		];
		
		expect(UtilService.getCurrentLanguageObject(
			2,
			data
		).value).toBe('fr');
	}));
	
	it('Check getLocaleById function', inject(function(UtilService) {
		var data =	[
			{locale : 'de', id: 0},
			{locale : 'en', id: 1},
			{locale : 'fr', id: 2},
			{locale : 'es', id: 3},
		];
		
		expect(UtilService.getLocaleById(
			2,
			data
		)).toBe('fr');
	}));
	
	it('Check getIdByLocale function', inject(function(UtilService) {
		var data =	[
			{locale : 'de', id: 0},
			{locale : 'en', id: 1},
			{locale : 'fr', id: 2},
			{locale : 'es', id: 3},
		];
		
		expect(UtilService.getIdByLocale(
			'de',
			data
		)).toBe(0);
	}));
	
});