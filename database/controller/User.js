var User = require('../model/User').User;
var safe = require('../../helper/Helper').safe
var promise = require('../../helper/Helper').promise

module.exports = function CreateAccount(value) {
    console.log(value)
    let user = new User({
        username: value.username, 
        password: value.password
    })
    return user.save()
}
