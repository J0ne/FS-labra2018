const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    passwordHash: String,
    account: String, // account id
    admin: Boolean,
    rights: String // todo: esim user, manager
})

userSchema.statics.format = (user) => {
    return {
        id: user._id, 
        username: user.username, 
        name: user.name, 
        email: user.email,
        account: user.account,
        admin: user.admin,
        rights: user.rights
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User