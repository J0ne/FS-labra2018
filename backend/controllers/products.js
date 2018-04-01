const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    nimi: String,
    koko: String,
    kuvaus: String,
    kokonaismäärä: Number,
    varastossaLkm: Number,
    lainassaLkm: Number,
    kategoria: String
})

module.exports = Product