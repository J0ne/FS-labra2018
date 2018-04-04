const productsRouter = require('express').Router()
const Product = require('../models/product')

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
    console.log("POST - metodissa...")
    const body = request.body

    // todo: loput validoinnit
    if (body.nimi === undefined) {
        response
            .status(400)
            .json({error: 'fields missing'})
    }

    const product = new Product({
        nimi: body.nimi,
        kuvaus: body.kuvaus,
        koko: body.koko,
        kokonaismäärä: body.kokonaismäärä,
        varastossaLkm: body.kokonaismäärä,
        kategoria: body.kategoria
    })

    const savedProduct = await product.save()
    response
        .status(201)
        .json(savedProduct)
})

module.exports = productsRouter
