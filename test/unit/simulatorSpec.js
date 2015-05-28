'use strict';

describe('Simulator tests', function() {

	// load modules
	beforeEach(module('pocketdocApp'));

	// Test service availability
	it('check the existence of User factory', inject(function(UserService) {
		expect(UserService).toBeDefined();
	}));

	it('check if user is logged out by default', inject(function(UserService) {
		expect(UserService.isLoggedIn()).toBe(false);
	}));

});