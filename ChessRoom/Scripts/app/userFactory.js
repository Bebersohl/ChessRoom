angular.module('usersApp')
    .factory('dataFactory', ['$http', function ($http) {

        var urlBase = '/api/users';
        var dataFactory = {};

        dataFactory.getUsers = function () {
            return $http.get(urlBase);
        };

        dataFactory.getUser = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        dataFactory.insertUser = function (cust) {
            return $http.post(urlBase, cust);
        };

        dataFactory.updateUser = function (cust) {
            return $http.put(urlBase + '/' + cust.ID, cust);
        };

        dataFactory.deleteUser = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        return dataFactory;
    }]);