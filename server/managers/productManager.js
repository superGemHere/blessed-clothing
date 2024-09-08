const Product = require('../models/Product');

exports.create = (productData) => Product.create(productData);
