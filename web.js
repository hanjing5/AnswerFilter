
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var answers = require('./routes/answers');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var db = require('./model/db');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.set("jsonp callback", true);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/create', answers.create);
app.get('/answers', answers.list)
app.post('/answers/create', answers.createAndRefresh);
app.get('/users', user.list);
app.get('/answers/create/:id/:answer', answers.create);
app.get('/answers/show/:id', answers.show);
app.get('/answers/delete/:id', answers.delete);
app.get('/answers/deleteAll', answers.deleteAll);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
