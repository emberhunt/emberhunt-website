angular.module('gameService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Game', ['$http',function($http) {
		return {
			sendCommand : function(command) {
				return $http.post('/api/sendCommand', command);
			},
			getLog : function() {
				return $http.get('/api/gamelog');
			},
			getLogFileName : function() {
				return $http.get('/api/logFileName');
			}
		}
	}]);