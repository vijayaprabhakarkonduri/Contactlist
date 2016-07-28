var express = require("express");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require("express-session");
var path = require('path');

//var ip = require('ip'); 

// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/torakku');

var routes = require('./routes/index');
var users = require('./routes/users');
var tasks = require('./routes/tasks');
var notifications = require('./routes/notifications');
var projects = require('./routes/projects');
var negative_marking_sheet = require('./routes/negative_marking');
var discussions = require('./routes/discussions'); //discussions
var curriculum = require('./routes/curriculum'); //Curriculum
var skills = require('./routes/skills'); //Skills


// Create a new Express application.
var app = express();
var port = process.env.PORT || 3002;
var server  = require('http').createServer(app);

// Discussions
var io = require('socket.io').listen(server);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware 
app.use(require('morgan')('combined'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ 
	secret: 'keyboard cat', 
	resave: false, 
	saveUninitialized: false 
}));

app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
		req.db = db;
		next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/tasks', tasks);
app.use('/notifications', notifications);
app.use('/projects', projects);
app.use('/negative_marking', negative_marking_sheet);
app.use('/db_discussions', discussions);
app.use('/db_curriculum', curriculum);
app.use('/skills', skills);


app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Error Handling
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Page Not Found');
	err.status = 404;
	next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		//res.send(err.message);
		res.render('error', {
			title: "Torakku - " + err.status,
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		title: "Torakku - " + err.status,
		message: err.message,
		error: {}
	});
});

io.on('connection', function(socket){
	socket.on('discussion', function(msg){
		io.emit('discussion', msg);
	});
});


//Start server
server.listen(port, function() {
	console.log("Server is running at http://127.0.0.1:" + port + "/");
	//console.log(app.get('env')); //Different values are development, test, production
});