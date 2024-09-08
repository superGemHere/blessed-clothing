const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    isOnSale: {
        type: Boolean,
        // required: [true, "isOnSale "]
    },
    isNewProduct: {
        type: Boolean,
        // required: true,
    },
    productName: {
        type: String,
        required: [true, "Product name is required."],

    },
    productModel: {
        type: String,
        required: [true, "Product model is required."],
    },
    imageUrl: {
        type: String,
        required: [true, "Image URL is required."],
    },
    oldPrice: {
        type: Number,
        // required: true,
    },
    newPrice: {
        type: Number,
        required: [true, "New price is required."],
    },
    colors: {
        type: [String],
        required: [true, "Colors are required."],
    },
    sizes: {
        type: [String],
        required: [true, "Sizes are required."],
    },
    gender: {
        type: String,
        required: [true, "Gender is required."],
    },
    age: {
        type: String,
        required: [true, "Age is required."],
    },
    images: {
        type: [String],
        required: [true, "Images are required."],
    },
    description: {
        type: String,
        required: [true, "Description is required."],
    }

 
})



const Product = mongoose.model('Product', productSchema);

module.exports = Product;