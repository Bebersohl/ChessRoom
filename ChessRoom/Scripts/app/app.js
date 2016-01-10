var app = angular.module('usersApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', {
        controller: 'usersController',
        templateUrl: '/app/views/users.html'
    })
    .otherwise({ redirectTo: '/' });

}]);