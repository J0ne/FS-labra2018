const mongoose = require('mongoose')

const lendingSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    products: Array,//[{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    deadline: Date,
    revertedDate: Date,
    lendingDate: Date
})

lendingSchema.statics.format = (lending) => {
    console.log('FORMAT', lending)
    return {
       id: lending._id,
       customer: lending.customer,
       products: lending.products, //.map(p => {return { id: p.id, amount: p.amount}}),
       deadline: lending.deadline,
       revertedDate: lending.revertedDate,
       lendingDate: lending.lendingDate
    }
}

const Lending = mongoose.model('Lending', lendingSchema)

module.exports = Lending