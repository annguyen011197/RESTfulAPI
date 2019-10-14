var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')

var UserSchema = mongoose.Schema({
    username: {
        type: String, 
        validate: {
            validator: v => {
                return v != "" 
            } 
        },
        index: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}