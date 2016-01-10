"use strict";
angular.module('usersApp')
    .controller('usersController', ['$scope', 'dataFactory',
        function ($scope, dataFactory) {

            $scope.status;
            $scope.users;

            getUsers();

            function getUsers() {
                dataFactory.getUsers()
                    .success(function (usrs) {
                        $scope.users = usrs;
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load user data: ' + error.message;
                    });
            }

            $scope.updateUser = function (id) {
                var usr;
                for (var i = 0; i < $scope.users.length; i++) {
                    var currUsr = $scope.users[i];
                    if (currUsr.ID === id) {
                        usr = currUsr;
                        break;
                    }
                }

                dataFactory.updateUser(usr)
                  .success(function () {
                      $scope.status = 'Updated User! Refreshing user list.';
                  })
                  .error(function (error) {
                      $scope.status = 'Unable to update user: ' + error.message;
                  });
            };

            $scope.insertUser = function () {
                //Fake customer data
                var usr = {
                    UserName: 'JoJo'
                };
                dataFactory.insertUser(usr)
                    .success(function () {
                        $scope.status = 'Inserted User! Refreshing user list.';
                        $scope.users.push(usr);
                    }).
                    error(function (error) {
                        $scope.status = 'Unable to insert user: ' + error.message;
                    });
            };

            $scope.deleteUser = function (id) {
                dataFactory.deleteUser(id)
                .success(function () {
                    $scope.status = 'Deleted User! Refreshing user list.';
                    for (var i = 0; i < $scope.users.length; i++) {
                        var usr = $scope.users[i];
                        if (usr.ID === id) {
                            $scope.users.splice(i, 1);
                            break;
                        }
                    }
                    $scope.orders = null;
                })
                .error(function (error) {
                    $scope.status = 'Unable to delete user: ' + error.message;
                });
            };
        }]);