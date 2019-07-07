
const bcrypt = require('bcrypt')
const adminRouter = require('express').Router()
const User = require('../models/user')

adminRouter.use(middleware.tokenExtractor)
adminRouter.post('/', async(request, response) => {
    const body = request.body

    const user = await User.findOne({username: body.username})

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
    
    if (!(user && passwordCorrect)) {
        return response.status(401).send({error: 'invalid username or password'})
    }
    if (!user.admin) return response.status(401).send({ error: 'user has no admin rights'})

    // todo: admin-hommat: 


    response.status(200).send({username: user.username, name: user.name})
})

module.exports = adminRouter