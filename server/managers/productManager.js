const Product = require("../models/Product");

exports.getAll = () => Product.find();
exports.getById = productId => Product.findById(productId);
exports.create = productData => Product.create(productData);

exports.getPaginatedProducts = async (page = 1, limit = 10) => {
  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch the paginated products
    const products = await Product.find().skip(skip).limit(limit);

    // Get the total count of documents in the collection
    const totalCount = await Product.countDocuments();

    return {
      products,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    };
  } catch (error) {
    throw new Error("Error fetching paginated products: " + error.message);
  }
};
