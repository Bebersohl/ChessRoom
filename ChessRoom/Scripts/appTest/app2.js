"use strict";
var usersList = angular.module("root", []);

usersList.controller("index", ["$scope", "$http", "$timeout", function ($scope, $http, $timeout) {
    $scope.users = [];
    var poller = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:52612//Api/Users'
        }).then(function successCallback(response) {
            console.log(response);
            $scope.users = response.data;
            $timeout(poller, 5000);
        }, function errorCallback(response) {
            console.log(response);
        });
    }
    poller();
    //  $scope.users = [
    //{name: "Mark", gender: "male", number: "(565) 355-3748"},
    //{name: "Glen", gender: "male", number: "(233) 245-3753"},
    //{name: "Dee", gender: "male", number: "(445) 666-3453"},
    //{name: "Eoghan", gender: "male", number: "(646) 334-5868"},
    //{name: "Dermot", gender: "male", number: "(875) 385-8685"},
    //{name: "Eoin", gender: "male", number: "(254) 385-3589"},
    //{name: "Matt", gender: "male", number: "(345) 693-5699"},
    //{name: "Chloe", gender: "female", number: "(654) 485-3985"},
    //{name: "Cian", gender: "male", number: "(484) 385-5839"},
    //{name: "John", gender: "male", number: "(373) 384-3860"},
    //{name: "Angela", gender: "female", number: "(374) 834-0088"},
    //{name: "Joshua", gender: "male", number: "(586) 039-8800"},
    //{name: "Alice", gender: "female", number: "(695) 858-3985"},
    //{name: "Derek", gender: "male", number: "(384) 345-4987"},
    //{name: "Annette", gender: "female", number: "(283) 348-3756"},
    //{name: "Tanya", gender: "female", number: "(354) 959-3859"},
    //{name: "Martin", gender: "male", number: "(386) 348-3824"},
    //{name: "Liam", gender: "male", number: "(383) 959-5948"},
    //{name: "Stewart", gender: "male", number: "(347) 869-3869"},
    //{name: "Brian", gender: "male", number: "(456) 485-3454"},
    //{name: "Peter", gender: "male", number: "(686) 485-3458"},
    //{name: "Lois", gender: "female", number: "(838) 586-6849"},
    //{name: "Meg", gender: "female", number: "(384) 485-6832"}
    //  ];


}]);
