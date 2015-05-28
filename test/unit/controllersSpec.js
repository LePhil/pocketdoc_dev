'use strict';

describe('PocketDoc controllers', function() {

  beforeEach(module('pocketdocApp'));

	var scope, $location;

	beforeEach(inject(function ( $rootScope, $controller, _$location_) {
		$location = _$location_;
		scope = $rootScope.$new();
	}));

	it('should provide german as the default language', inject(function($controller) {
		var ctrl = $controller('HeaderController', {
			$scope:scope
		});

		expect(scope.lang).toBe( "de" );
	}));

});