var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport')
var cors = require('cors')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var meRouter = require('./routes/me')
require('./config/passport')(passport)
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect('mongodb+srv://annguyen:1234567minhan@kikibookstore-9aubp.mongodb.net/DeadLine', { useNewUrlParser: true });
app.use(cors());

app.listen(8080, () => {
  console.log("Listening at 8080")
})
app.use(express.static(path.join(__dirname, 'public')));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected")
});

app.use('/user', userRouter);
app.use('/me', passport.authenticate('jwt', { session: false }), meRouter);

module.exports = app;

