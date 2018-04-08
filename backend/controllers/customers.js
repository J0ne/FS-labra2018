const customersRouter = require('express').Router()
const Customer = require('../models/customer')

customersRouter.get('/', async(request, response) => {
    const customers = await Customer.find({})
    response.json(customers.map(Customer.format))
})
customersRouter.get('/:id', async(request, response) => {
    console.log(request.params.id)
    const customer = await Customer.findById(request.params.id)
    response.json(Customer.format(customer))
})
customersRouter.post('/', async(request, response) => {
    console.log("POST - metodissa...")
    const body = request.body

    // todo: loput validoinnit
    if (body.firstname === undefined || body.lastname === undefined) {
        response.status(400).json({error: 'Nimitiedot puutteelliset'})
    }

    const customer = new Customer({
        firstname: body.firstname,
        lastname: body.lastname,
        username: body.username,
        address: body.address,
        created: new Date().toISOString(),
        email: body.email,
        telephone: body.telephone,
        department: body.department
    })
    const savedcustomer = await customer.save()
    response.status(201).json(savedcustomer)
})

module.exports = customersRouter
