var express = require('express');
var router = express.Router();
var safe = require('../helper/Helper').safe
var createAccount = require('../database/controller/User')

function error(res, msg) {
  res.status(404)
  res.send({
    message: msg
  })
  return
}

router.route('/register')
.post(async (req, res, next) => {
  let username = new String(safe(req.body, body => body.username, ""))
  let password = new String(safe(req.body, body => body.password, ""))

  if (username.length <= 0) {
    return error(res, "Username length")
  }

  if (password.length <= 0) {
    return error(res, "Password length")
  }
  try {
    let account = await createAccount({
      username: username,
      password: password
    })
    res.status(200)
    res.end()
  } catch(err) {
    error(res,err)
  }
})

module.exports = router;
