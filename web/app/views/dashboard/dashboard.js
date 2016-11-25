'use strict';
angular.module('myApp.dashboard', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])
    .controller('DashboardCtrl', function ($scope,$compile) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

    });
