// module dependencies
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    moment = require('moment');

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

// database
mongoose.connect('mongodb://localhost/test-rest');
var Schema = mongoose.Schema;  
var Posts = new Schema({  
  title: { type: String, required: true },  
  description: { type: String, required: true },
  added: { type: Date, default: Date.now }
});
var PostsModel = mongoose.model('Posts', Posts); 


// routes
app.get('/', routes.index);
app.get('/api', routes.api);
app.get('/ping', routes.ping);
app.get('/angular', routes.angular);

// endpoints
app.get('/api/posts', function (req, res){
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  return PostsModel.find(function (err, posts) {
    if (!err) {
      my_list = []
      for (var j = 0; j < posts.length; j++){
        my_list.push([parseInt(moment(posts[j].added).format("X")),j+1]);
      }
      console.log(my_list)
      return res.send(my_list);
    } else {
      return console.log(err);
    }
  });
});

app.get('/api/posts/:id', function (req, res){
  return PostsModel.findById(req.params.id, function (err, posts) {
    if (!err) {
      return res.send(posts);
    } else {
      return console.log(err);
    }
  });
});

app.post('/api/posts', function (req, res){
  var posts;
  console.log("POST: ");
  console.log(req.body);
  posts = new PostsModel({
    title: req.body.title,
    description: req.body.description,
    style: req.body.style,
  });
  posts.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(posts);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
