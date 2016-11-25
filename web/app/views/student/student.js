'use strict';

angular.module('myApp.student', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/students/:id', {
            templateUrl: 'views/student/student.html',
            controller: 'StudentCtrl'
        });
    }])

    .controller('StudentCtrl', function ($scope, $http, $routeParams) {
        console.log("student page");
        $scope.student = {};
        $http.get(urlapi + 'students/' + $routeParams.id)
            .success(function (data, status, headers, config) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.student = data; // for UI
            })
            .error(function (data, status, headers, config) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
                //students = result.data;
            });
    });
