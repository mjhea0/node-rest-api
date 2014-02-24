var demoPosts = angular.module('demoPosts', ['nvd3ChartDirectives']);

function mainController($scope, $http) {
  // when landing on the page, get all the posts and show them
  $http.get('/api/posts')
    .success(function(data) {
      console.log(data)
      $scope.posts = [
      {
        "key":"series 1",
        "values": data
      }
      ];
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
}
