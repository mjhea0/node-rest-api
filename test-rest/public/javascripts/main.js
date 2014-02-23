var demoPosts = angular.module('demoPosts', []);

function mainController($scope, $http) {
  // when landing on the page, get all the posts and show them
  $http.get('/api/posts')
    .success(function(data) {
      console.log(data)
      $scope.posts = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
}


