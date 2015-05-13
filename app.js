var express = require("express");
var logger = require("morgan");
var parser = require("body-parser");
var path = require("path");
var swig = require("swig");
var routes = require("./routes/");
var sass = require('node-sass-middleware');

var app = express();
var server = app.listen(1234);


swig.setDefaults({cache:false});
app.engine("html", swig.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname,"/views"));
app.set('view cache', false);

app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

app.use(
  sass({
    src: path.join(__dirname, '/assets'), //where the sass files are 
    dest: path.join(__dirname, '/public'), //where css should go
    debug: true
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')))
app.use('/',routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle all errors (anything passed into next())
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({error: err});
    res.render('error',{message: err.message, error:{}});
});

module.exports = app;