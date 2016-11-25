'use strict';
angular.module('myApp.main', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'views/main/main.html',
            controller: 'MainCtrl'
        });
    }])
    .controller('MainCtrl', function ($scope, $http, $timeout, $window, $mdDialog) {
        $scope.students = {};
        $scope.subjects = {};
        $http.get(urlapi + 'students')
            .success(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.students = data; // for UI
            })
            .error(function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
                //students = result.data;
            });

        /**GET list of all the subjects**/
        $http.get(urlapi + 'subjects')
            .success(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.subjects = data; // for UI
            })
            .error(function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
                //subjects = result.data;
            });

        /* new subject */
        $scope.showNewSubject = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                contentElement: '#myDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };
        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }

        $scope.postNewSubject = function () {
            $http({
                url: urlapi + 'subjects/',
                method: "POST",
                data: $scope.newSubject
            })
                .then(function (response) {
                    // success
                    $scope.subjects = response.data;
                    $mdDialog.hide();
                },
                function (response) { // optional
                    // failed
                    console.log('Email already in use');
                });
        };
    });
