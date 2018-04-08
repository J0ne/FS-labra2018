const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    //secondname: String,
    username: String,
    address: { },
    created: Date,
    email: String,
    telephone: String,
    department: String
})

customerSchema.statics.format = (customer) => {
    return {
        id: customer._id,
        firstname: customer.firstname,
        lastname: customer.lastname,
        username: customer.username,
        address: { },
        created: customer.created,
        email: customer.email,
        telephone: customer.telephone,
        department: customer.department
    }
}

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer