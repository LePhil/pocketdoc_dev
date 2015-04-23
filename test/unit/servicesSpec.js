'use strict';

describe('service', function() {

	// load modules
	beforeEach(module('pocketdocApp'));

	// Test service availability
	it('check the existence of User factory', inject(function(User) {
		expect(User).toBeDefined();
	}));
});