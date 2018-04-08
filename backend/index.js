const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const productRouter = require('./controllers/products')
const customersRouter = require('./controllers/customers')
const lendingsRouter = require('./controllers/lendings')

mongoose
    .connect(config.mongoUrl)
    .then(() => {
        console.log('connected to database', config.mongoUrl)
    })
    .catch(err => {
        console.log(err)
    })

mongoose.Promise = global.Promise
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)

app.use('/api/products', productRouter)
app.use('/api/customers', customersRouter)
app.use('/api/lendings', lendingsRouter)

app.use(middleware.error)

const server = http.createServer(app)
console.log(config)
server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
    mongoose
        .connection
        .close()
})

module.exports = {
    app,
    server
}