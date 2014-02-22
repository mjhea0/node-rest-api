// module dependencies
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose');

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
var Tasks = new Schema({  
  title: { type: String, required: true },  
  description: { type: String, required: true },
  modified: { type: Date, default: Date.now }
});
var TasksModel = mongoose.model('Tasks', Tasks); 


// routes
app.get('/', routes.index);
app.get('/api', routes.api);
app.get('/ping', routes.ping);
app.get('/chart', function(req, res){
  res.render("chart.html");
});

// endpoints
app.get('/api/tasks', function (req, res){
  return TasksModel.find(function (err, tasks) {
    if (!err) {
      return res.send(tasks);
    } else {
      return console.log(err);
    }
  });
});
app.get('/api/tasks/:id', function (req, res){
  return TasksModel.findById(req.params.id, function (err, tasks) {
    if (!err) {
      return res.send(tasks);
    } else {
      return console.log(err);
    }
  });
});
app.post('/api/tasks', function (req, res){
  var tasks;
  console.log("POST: ");
  console.log(req.body);
  tasks = new TasksModel({
    title: req.body.title,
    description: req.body.description,
    style: req.body.style,
  });
  tasks.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(tasks);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
