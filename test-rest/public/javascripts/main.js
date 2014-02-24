var demoPosts = angular.module('demoPosts', ['nvd3ChartDirectives']);


function mainController($scope, $http) {
  // when landing on the page, get all the posts and show them
  $http.get('/api/posts')
    .success(function(data) {
      console.log(data)
      $scope.posts = 
      [{
        "key":"series 1",
        "values": data
      }
      ]
      $scope.xAxisTickFormatFunction = function(){
        return function(d){
          return d3.time.format("%Y-%m-%d")(moment.unix(d).toDate());
        }
      };
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
}






