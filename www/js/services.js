angular.module('deliveryApp')

.factory('Auth', function($firebaseAuth) {
	ref = new Firebase('https://delivery-app.firebaseio.com/users');
	return $firebaseAuth(ref);
});