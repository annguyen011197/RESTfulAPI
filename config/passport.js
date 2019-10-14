var passport = require('passport')
const passportJWT = require("passport-jwt");
var LocalStrategy = require('passport-local').Strategy
var User = require('../database/model/User').User
var userController = require('../database/controller/User')
var ExtractJWT = passportJWT.ExtractJwt
var JWTStrategy = passportJWT.Strategy


module.exports = function(passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    
    //passport-local
    passport.use( new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            var user = await User.findOne({
                'username': username,
            })
            if (!user) {
                return done(null, false, {message: 'Incorrect email.'})
            }
            console.log(`user ${user}`)
            console.log(`validPass: ${user.validPassword(password)}`)
            if (user.validPassword(password)) {
                return done(null, user, {message: 'Logged In Successfully'})
            }
            return done(null, false, {message: 'Incorrect password'})
          } catch(err) {
            done(err)
          }
    }))

    //passport-jwt
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'annguyen011197'
    }, async (jwtPayload, done) => {
        try {
            var user = await User.findById(jwtPayload.id)
            return done(null, user)
          } catch(err) {
            done(err)
          }
    }))

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback : true
    },async (req, username, password, done) => {
        if (!req.user) {
            try {
                var user = await User.findOne({
                    'username': username,
                    'password': password
                })

                if (user) {
                    return done(null, user, {message: 'That email is already taken.'})
                }
                var newUser = await userController.create({
                    username: username, 
                    password: password
                })
                return done(null, newUser)
            } catch(err) {
                return done(err)
            }
        } else {
            return done(null, req.user)
        }
    }))
}