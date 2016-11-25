'use strict';

angular.module('myApp.subject', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/subjects/:id', {
            templateUrl: 'views/subject/subject.html',
            controller: 'SubjectCtrl'
        });
    }])

    .controller('SubjectCtrl', function ($scope, $http, $routeParams, $mdDialog) {
        console.log("student page");
        $scope.subject = {};
        $http.get(urlapi + 'subjects/by/id/' + $routeParams.id)
            .success(function (data) {
                console.log('data success');
                console.log(data); // for browser console
                $scope.subject = data; // for UI
                //$scope.hide();
            })
            .error(function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
                //students = result.data;
            });


        $scope.showNewStudent = function (ev) {
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

        $scope.newStudent = {};
        $scope.postNewStudentToSubject = function () {
            $http({
                url: urlapi + 'subjects/' + $routeParams.id + '/addstudent',
                method: "POST",
                data: $scope.newStudent
            })
                .then(function (response) {
                        // success
                        $http.get(urlapi + 'subjects/' + $routeParams.id)
                            .success(function (data) {
                                console.log('data success');
                                console.log(data); // for browser console
                                $scope.subject = data; // for UI
                            })
                            .error(function (data, status) {
                                console.log('data error');
                                console.log(status);
                                console.log(data);
                            })
                            .then(function (result) {
                                //students = result.data;
                            });
                    },
                    function (response) { // optional
                        // failed
                        console.log('Email already in use');
                    });
        };

    });
