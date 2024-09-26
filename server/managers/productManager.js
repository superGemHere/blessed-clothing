const Product = require("../models/Product");

exports.getAll = () => Product.find();
exports.getById = productId => Product.findById(productId);
exports.create = productData => Product.create(productData);

exports.getPaginatedProducts = async (page = 1, limit = 10, sort = 'asc', maxPrice = 1000, gender = '', age = '', trending = false, sale = false, sizes = []) => {
  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    const query = { newPrice: { $lte: maxPrice } };
    if (gender) {
      query.gender = gender;
    }
    if (age) {
      query.age = age;
    }
    if (trending) {
      query.trending = true;
    }
    if (sale) {
      query.isOnSale = true;
    }
    if (sizes.length) {
      console.log("Sizes:", sizes);
      query.sizes = { $in: sizes };
    }
    const sortOrder = sort === 'asc' ? 1 : -1;
    
    const products = await Product.find(query)
      .sort({ newPrice: sortOrder })
      .skip(skip)
      .limit(limit);
    console.log("Fetched products:", products);

    // Get the total count of documents in the collection that match the query
    const totalCount = await Product.countDocuments(query);
    console.log("Total count:", totalCount);

    return {
      products,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    };
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    throw new Error("Error fetching paginated products: " + error.message);
  }
};


