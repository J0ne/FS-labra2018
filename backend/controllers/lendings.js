const lendingsRouter = require('express').Router()
const Lending = require('../models/lending')

lendingsRouter.get('/', async(request, response) => {
    const lendings = await Lending.find({})
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
    // if (body.firstname === undefined || body.lastname === undefined) {
    //     response
    //         .status(400)
    //         .json({error: 'Nimitiedot puutteelliset'})
    // }
    const lending = new Lending({
        customer: body.customer,
        products: body.products.map(p => {return { id: p.id, amount: p.amount}}),
        deadline: body.deadline,
        revertedDate: null,
        lendingDate: new Date().toISOString()
    })

    const savedlending = await lending.save()

    response.status(201).json(savedlending)
})

module.exports = lendingsRouter
