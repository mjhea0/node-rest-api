// module dependencies
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    moment = require('moment'),
    Faker = require('Faker');

// create express server
var app = express();


// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// routes
app.get('/', routes.index);
app.get('/api', routes.api);
app.get('/ping', routes.ping);
app.get('/angular', routes.angular);
app.get('/test', routes.test);

// endpoints
app.get('/api/v1/posts', function (req, res){
  var totalPosts = Faker.Helpers.randomNumber(2000);
  console.log(totalPosts+1000)
  return res.send({"total_posts":totalPosts+10000});
});

app.get('/api/v1/users', function (req, res){
  var totalUsers = Faker.Helpers.randomNumber(2000);
  console.log(totalUsers+1000)
  return res.send({"total_users":totalUsers+1000});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
