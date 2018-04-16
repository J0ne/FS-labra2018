const lendingsRouter = require('express').Router()
const Lending = require('../models/lending')
const productHelper = require('../services/productService')

lendingsRouter.get('/', async(request, response) => {
    const lendings = await Lending.find({}).populate('customer',
     {'id': 1, 'firstname': 1, 'lastname': 1, 'email': 1})
    response.json(lendings.map(Lending.format))
})
lendingsRouter.get('/:id', async(request, response) => {
    console.log(request.params.id)
    const lending = await Lending.findById(request.params.id)
    response.json(Lending.format(lending))
})
lendingsRouter.post('/', async(request, response) => {
    console.log("POST - lendings...")
    const body = request.body

    // todo: loput validoinnit
    if (body.customer === undefined) {
        response
            .status(400)
            .json({error: 'Asiakas puuttuu'})
    }
    const lending = new Lending({
        customer: body.customer,
        products: body.products,
        deadline: body.deadline,
        revertedDate: null,
        lendingDate: new Date().toISOString()
    })
   
    const savedlending = await lending.save()
    savedlending.products.map(p => productHelper.decreaseFromStorage(p.id, p.amount))
    // haetaan ja palautetaan 'täydellinen' olio

    const populatedObj = await Lending.findById(savedlending._id).populate('customer',
     {'id': 1, 'firstname': 1, 'lastname': 1, 'email': 1})
console.log('populatedObj', populatedObj)
    response.status(201).json(Lending.format(populatedObj))
})

lendingsRouter.put('/:id', async(request, response) => {
    const body = request.body
    const lending = {
        customer: body.customer,
        products: body.products,
        deadline: body.deadline,
        revertedDate: new Date().toISOString(),
        lendingDate: body.lendingDate
    }
    try {
        const result = await Lending.findByIdAndUpdate(request.params.id, lending, {new: true})
        result.products.map( p => productHelper.increaseStorageAmount(p.id, p.amount))
        console.log('REVERTED:', result)
        response.json(Lending.format(result))
    } catch (error) {
        console.log("error:", error)
        response.status(400).send({error: 'malformatted id'})
    }

})

module.exports = lendingsRouter
