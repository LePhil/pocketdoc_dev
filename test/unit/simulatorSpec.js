'use strict';

describe('Simulator tests', function() {

	// load modules
	beforeEach(module('pocketdocApp'));

	// Test UserService availability
	it('check the existence of User Service', inject(function(UserService) {
		expect(UserService).toBeDefined();
	}));

	it('check if user is logged out by default', inject(function(UserService) {
		expect(UserService.isLoggedIn()).toBe(false);
	}));
	
	it('Create User and check if logged in', inject(function(UserService) {
		
		UserService.createUser(
			{
				email: 'test@test.ch',
				password: 'test',
				name: 'test',
				gender: '0',
				age_category: '0',
				lang: 'de'
			},
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
			{
				email: 'test@test.ch',
				password: 'test',
				name: 'test',
				gender: '0',
				age_category: '0',
				lang: 'de'
			},
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
	it('check the existence of Meda Data Service', inject(function(MetaDataService) {
		expect(MetaDataService).toBeDefined();
	}));
	
	// Test UtilService availability
	it('check the existence of Util Service', inject(function(UtilService) {
		expect(UtilService).toBeDefined();
	}));
	
});