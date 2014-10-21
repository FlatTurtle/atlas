var app = angular.module('PocApp', ['ngRoute']);


app.service('Doctors', ['$http',
function($http){

    var Doctors = this;

    $http.get('data/data.json').success(function(response)
    {
        Doctors.data = response;
    });
}]);

app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller:'HomeCtrl',
                templateUrl:'partials/home.html'
            })
            .when('/doctors', {
                controller:'DoctorsListCtrl',
                templateUrl:'partials/doctors-list.html'
            })
            .when('/doctors/:doctorId', {
                controller:'DoctorsDetailCtrl',
                templateUrl:'partials/doctors-detail.html'
            })
            .when('/route/:doctorId', {
                controller:'GetMeThereCtrl',
                templateUrl:'partials/get-me-there.html'
            })
            .otherwise({
                redirectTo:'/'
            });
    });

app.controller('HomeCtrl', ['$scope', '$timeout', '$location',
    function ($scope, $timeout, $location) {
        $scope.showToast = function() {
            $(".toast").fadeIn(300);
            $timeout(function()
            {
                $(".toast").fadeOut(200);
            }, 1000);
        };
        $("#left").hide();
        $location.replace();
    }]);

app.controller('FooterCtrl', ['$scope', '$timeout',
    function ($scope, $timeout)
    {
        $scope.showToast = function()
        {
            $(".toast").fadeIn(300);
            $timeout(function()
            {
                $(".toast").fadeOut(200);
            }, 1000);
        };
        $scope.goBack = function()
        {
            window.history.back();
        };
    }]);

app.controller('DoctorsListCtrl', ['$scope', '$http', '$filter', 'Doctors',
    function ($scope, $http, $filter, Doctors) {

        $scope.doctors = Doctors;

        jsKeyboard.init("virtualKeyboard");

        //first input focus
        var $firstInput = $('#input').focus();
        jsKeyboard.currentElement = $firstInput;
        jsKeyboard.currentElementCursorPosition = 0;

        $("#keyboard .button").on('click', function()
        {
            $scope.$apply(function()
            {
                $scope.query = $("#input").val();
            });
        });

        $("#left").show();
    }]);

app.controller('DoctorsDetailCtrl', ['$scope', '$http', '$routeParams', 'Doctors',
    function($scope, $http, $routeParams, Doctors)
    {
        $scope.id = $routeParams.doctorId;
        $scope.doctor = Doctors.data[parseInt($routeParams.doctorId) - 1];

        $("#left").show();
    }]);

app.controller('GetMeThereCtrl', ['$scope', '$http', '$routeParams', '$timeout', 'Doctors',
    function($scope, $http, $routeParams, $timeout, Doctors) {
        $scope.id = $routeParams.doctorId;
        $scope.doctor = Doctors.data[parseInt($routeParams.doctorId) - 1];
        $scope.page = 'description';

        $scope.showToast = function()
        {
            $(".toast").fadeIn(300);
            $timeout(function()
            {
                $(".toast").fadeOut(200);
            }, 1000);
        };

        $scope.changePage = function(page)
        {
          $scope.page = page;
        };
        $("#left").show();
    }]);