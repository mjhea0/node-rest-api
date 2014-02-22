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
app.get('/chart', routes.chart);

// endpoints
app.get('/api/posts', function (req, res){
  return PostsModel.find(function (err, posts) {
    if (!err) {
      return res.send(posts);
    } else {
      return console.log(err);
    }
  });
});
// app.get('/api/posts/:id', function (req, res){
//   return PostsModel.findById(req.params.id, function (err, posts) {
//     if (!err) {
//       return res.send(posts);
//     } else {
//       return console.log(err);
//     }
//   });
// });



app.get('/api/posts/:id', function(req, res) {
 
  var data;
    
    if(req.params.id==1) {
      data = {
        labels : ["January","February","March","April","May","June"],
        datasets : [
          {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            data : [6,6,9,8,2,5]
          }
        ]
      };
    } else {
      data = {
        labels : ["July","August","September","October","November","December"],
        datasets : [
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                data : [3,8,4,2,10,3]
            }
        ]
      };
    }
    res.send(data);
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
