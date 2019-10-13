var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/admin', {useNewUrlParser: true});

app.listen(8080,() => {
    console.log("Listening at 8080")
})
app.use(express.static(path.join(__dirname, 'public')));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected")
});

// app.use('/', indexRouter);
app.use('/user', userRouter);

module.exports = app;

