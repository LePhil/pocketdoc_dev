'use strict';

describe('PocketDoc controllers', function() {
	var scope,
		$location,
		store = {};

	beforeEach( function(){
		module('pocketdocApp');

		inject(function ( $rootScope, $controller, _$location_) {
			$location = _$location_;
			scope = $rootScope.$new();
		});

		spyOn(localStorage, 'getItem').andCallFake(function(key) {
			return store[key];
		});
		
		Object.defineProperty(sessionStorage, "setItem", { writable: true });
		
		spyOn(localStorage, 'setItem').andCallFake(function(key, value) {
			store[key] = value;
		});

	});

	afterEach(function () {
		store = {};
	});

	it('should provide german as the default language', inject(function($controller) {
		var ctrl = $controller('HeaderController', {
			$scope:scope
		});

		expect(scope.lang).toBe( "de" );
	}));

	it('should be logged in after login-broadcast was triggered', inject(function($controller) {
		var ctrl = $controller('HeaderController', {
			$scope:scope
		});

		scope.$emit("login");

		expect(scope.loggedIn).toBe( true );
	}));

	it('should be logged out after logout-broadcast was triggered', inject(function($controller) {
		var ctrl = $controller('HeaderController', {
			$scope:scope
		});

		scope.$emit("logout");

		expect(scope.loggedIn).toBe( false );
	}));

	it('should change the language upon broadcast', inject(function($controller) {
		var ctrl = $controller('HeaderController', {
			$scope:scope
		});

		scope.$emit("languageChange", 'en');

		expect( scope.lang ).toBe( 'en' );
	}));

});