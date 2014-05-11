angular.module('bazi')
.controller('tweetsController', function ($scope, data) {
  $scope.tweets = data.tweets;
});
