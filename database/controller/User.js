var User = require('../model/User').User;
var safe = require('../../helper/Helper').safe
var promise = require('../../helper/Helper').promise

module.exports = {
    create: function (value) {
        let username = safe(value, value => value.username, "")
        let password = safe(value, value => value.password, "")
        let user = new User()
        user.username = username
        user.password = user.generateHash(password)
        return user.save()
    }
}