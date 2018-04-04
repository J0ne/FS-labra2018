const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    nimi: String,
    koko: String,
    kuvaus: String,
    kokonaismäärä: Number,
    varastossaLkm: Number,
    lainassaLkm: Number,
    kategoria: String
})

productSchema.statics.format = (product) => {
    return {
        id: product._id,
        nimi: product.nimi,
        kuvaus: product.kuvaus,
        koko: product.koko,
        kokonaismäärä: product.kokonaismäärä,
        varastossaLkm: product.varastossaLkm,
        lainassaLkm: product.varastossaLkm,
        kategoria: product.kategoria

    }
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product