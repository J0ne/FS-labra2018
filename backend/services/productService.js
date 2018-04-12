const Product = require('../models/product')

const decreaseFromStorage = async ( productid, amount ) => {
    let product = await Product.findById(productid)
    product.amountInStorage = Number(product.amountInStorage) - Number(amount)

    const saved = await product.save()
    return saved
}

const increaseStorageAmount = async (productid, amount) => {
    let product = await Product.findById(productid)
    product.amountInStorage = product.amountInStorage + Number(amount)

    const saved = await product.save()
    return saved
}

module.exports = {
    decreaseFromStorage,
    increaseStorageAmount
}