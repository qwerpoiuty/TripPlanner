var app = require("express");
var logger = require("morgan");
var parser = require("body-parser");
var path = require("path");
var swig = require("swig");
var routes = require("./routes/");
var server = app.listen(1234);

app.engine("html",swig.renderfile);
app.set("view engine", "html");
app.set("views", path.join(__dirname,"/views"));
app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
swig.setDefaults({chache:false});


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