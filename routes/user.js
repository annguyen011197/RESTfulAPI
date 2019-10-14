var express = require('express');
var router = express.Router();
var passport = require('passport')
var jwt = require('jsonwebtoken')

function error(res, json) {
  res.status(404)
  res.send(json)
  return res
}

function success(res, json) {
  res.status(200)
  res.send(json)
  return res
}

function logIn(req, res, user) {
  req.logIn(user, (err) => {
    if (err) {
      console.log(err)
      return error(res,{
        message: "Failed on register2",
        error: err
      })
    }
    console.log(user)
    const token = jwt.sign({id: user._id}, 'annguyen011197')
    return success(res, {
      message: "Succesfully",
      code: 0,
      user: user, 
      token: token
    })
  })
}

router.route('/register')
.post((req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err || !user) {
      return error(res,{
        message: "Failed on register1",
        error: err
      })
    }

    logIn(req, res, user)
  })(req, res, next)
})

router.route('/login')
.post( (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log(user)
    if (err || !user) {
      return error(res,{
        message: "Failed on Loging",
        error: err,
        info: info 
      })
    }

    logIn(req, res, user)
  })(req, res, next)
})

module.exports = router;
