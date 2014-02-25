var demoAPI = angular.module('demoAPI', []);

function mainController($scope, $http) {
  // when landing on the page, get all the posts and show them
  $http.get('/api/v1/users')
    .success(function(data) {
      console.log(data["total_users"])
      $scope.users = data["total_users"];
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  $http.get('/api/v1/posts')
    .success(function(data) {
      console.log(data["total_posts"])
      $scope.posts = data["total_posts"];
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
}






