angular.module('gameService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Game', ['$http',function($http) {
		return {
			getFPS : function() {
				return $http.get('/api/fps');
			},
			getHelp : function() {
				return $http.get('/api/help');
			}
		}
	}]);