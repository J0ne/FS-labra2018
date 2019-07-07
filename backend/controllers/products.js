const productsRouter = require('express').Router()
const Product = require('../models/product')

//
productsRouter.get('/', async(request, response) => {
    const products = await Product.find({})
    response.json(products.map(Product.format))
})
productsRouter.get('/:id', async(request, response) => {
console.log(request.params.id)
    const product = await Product.findById(request.params.id)
    response.json(Product.format(product))
})

productsRouter.post('/', async(request, response) => {
    console.log("POST, product")
    const body = request.body

    // todo: loput validoinnit
    if (body.name === undefined) {
        response.status(400).json({error: 'product name is missing'})
    }

    const product = new Product({
        name: body.name,
        description: body.description,
        size: body.size,
        amount: body.amount,
        amountInStorage: body.amountInStorage,
        category: body.category
    })

    const savedProduct = await product.save()
    response.status(201).json(savedProduct)
})

module.exports = productsRouter
