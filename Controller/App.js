var app = angular.module("myApp", ['ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/", {
            templateUrl: "layout/TrangChu.html",
            // controller: "TrangChuCtrl"
        })
        .when("/GioiThieu", {
            templateUrl: "layout/GioiThieu.html"
        })
        .when("/TrangThi", {
            templateUrl: "layout/TrangThi.html",
            // controller: "TrangThiCtrl"
        })
        .when("/LienHe", {
            templateUrl: "layout/Lienhe.html"
        })
        .when("/GopY", {
            templateUrl: "layout/GopY.html",
            // controller: "GopYCtrl"
        })
        .when("/HoiDap", {
            templateUrl: "layout/HoiDap.html"
        })

        .when("/DangKi", {
            templateUrl: "layout/DangKi.html",
            // controller: "DangKiCtrl"
        })
        .when("/QuenMK", {
            templateUrl: "layout/QuenMK.html",
            // controller: "QuenMKCtrl"
        })
        .when("/DoiMK", {
            templateUrl: "layout/DoiMK.html",
            // controller: "DoiMKCtrl"
        })
        .when("/CapNhat",{
            templateUrl: "layout/CapNhat.html",
        })
        .when("/trangThi", {
            templateUrl: "layout/trangThi.html",
            // controller: "trangThiCtrl"
        })
})


app.directive('quizfpoly', function (quizFactory) {
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'template-quiz.html',
        link: function (scope, elem, attrs) {
            scope.start = function () {
                scope.id = 1;
                scope.quizOver = false;// chưa hoàn thành
                scope.inProgess = true;
                scope.getQuestion();
            };
            scope.reset = function () {
                scope.inProgess = false;
                scope.score = 0;
            };
            scope.getQuestion = function () {
                var quiz = quizFactory.getQuestion(scope.id);// lấy question thứ 0
                if (quiz) {
                    scope.question = quiz.Text;
                    scope.options = quiz.Answers;
                    scope.answer = quiz.AnswerId;
                    scope.answerMode = true;
                }
                else {
                    scope.quizOver = true;
                }

            }
            scope.checkAnswer = function () {
                // alert('answer');
                if (!$('input[name = answer]:checked').length) return;
                var ans = $('input[name = answer]:checked').val();
                if (ans == scope.answer) {
                    // alert('Bạn đã trả lời đúng');
                    scope.score++;
                    scope.correctAns = true;
                }
                else {
                    // alert('Bạn đã trả lời sai');
                    scope.correctAns = false;
                }
                scope.answerMode = false; // ẩn và hiện 
            };
            scope.nextQuestion = function () {
                scope.id++;
                scope.getQuestion();
            }
            scope.reset();
        }
    }
});
app.factory('quizFactory', function ($http) {
    $http.get('/db/').then(function (res) {
        questions = res.data;
        alert(questions.length);
    });
    return {
        getQuestion: function (id) {// lấy phần tử thứ bao nhiêu trong mảng
            var randomItem = questions[Math.floor(Math.random() * question.length)];
            var count = questions.length;
            if (count > 10) {
                count = 10;
            }

            if (id < count) {
                return randomItem;
            }
            else {
                return false;
            }

        }
    }
});
function myCtrl($scope, $http) {
    $scope.subjects = []
    $scope.products = [];
    $scope.lengthOfPage = 0;
    $scope.numberOfPage = [];

    $http.get("https://6214fc3bcdb9d09717a8ea1a.mockapi.io/subject").then((response) => {
        $scope.subjects = response.data
        console.log($scope.subjects)
        if ($scope.subjects.length % 2 == 0) {
            $scope.lengthOfPage = $scope.subjects.length / 4;
        } else {
            $scope.lengthOfPage = $scope.subjects.length / 4 + 1;
        }
        for (var i = 0; i < $scope.lengthOfPage; i++) {
            $scope.numberOfPage.push(i)
        }
    })

    $scope.paging = (index) => {

        $scope.products = [];
        if (index * 4 + 4 > $scope.subjects.length) {
            for (var i = index * 4; i < $scope.subjects.length; i++) {
                $scope.products.push($scope.subjects[i]);
            }
        } else {
            for (var i = index * 4; i < index * 4 + 4; i++) {
                $scope.products.push($scope.subjects[i])
            }
        }
    }
}
app.controller("myCtrl", myCtrl);