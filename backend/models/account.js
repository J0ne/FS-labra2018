const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    name: String, 
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

accountSchema.statics.format = (account) => {
    return {id: account._id, users: account.users}
}

const Account = mongoose.model('Account', accountSchema)

module.exports = Account