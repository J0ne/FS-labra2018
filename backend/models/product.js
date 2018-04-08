const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    size: String,
    description: String,
    amount: Number,
    amountInStorage: Number,
    amountOfLended: Number,
    category: String
})

productSchema.statics.format = (product) => {
    return {
        id: product._id,
        name: product.name,
        description: product.description,
        size: product.size,
        amount: product.amount,
        amountInStorage: product.amountInStorage,
        amountOfLended: product.amountOfLended,
        category: product.category
    }
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product