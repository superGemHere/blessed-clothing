const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
    isOnSale: {
        type: Boolean,
        required: true,
    },
    isNew: {
        type: Boolean,
        required: true,
    },
    productName: {
        type: String,
        required: true,

    },
    productModel: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true,
    },
    newPrice: {
        type: Number,
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },
    sizes: {
        type: [String],
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    }

 
})



const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;