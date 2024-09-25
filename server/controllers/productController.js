const router = require('express').Router();
const productManager = require('../managers/productManager');
const {isAuth, isAdmin} = require('../middlewares/authMiddleware'); // Import your middleware

// Apply the verifyToken middleware to the product creation route
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'asc';
    const maxPrice = parseInt(req.query.maxPrice) || 1000;
    const gender = req.query.gender || '';
    const age = req.query.age || '';
    const trending = req.query.trending === 'true';
    const sale = req.query.sale === 'true';
    
    console.log("query", req.query);
    
    try {
        const products = await productManager.getPaginatedProducts(page, limit, sort, maxPrice, gender, age, trending, sale);
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ 
            message: err.message 
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productManager.getById(productId); // Adjust this function to get a product by ID
        console.log(product);
        
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(400).json({ 
            message: err.message 
        });
    }
});

router.post('/create', isAuth, isAdmin, async (req, res) => {
    try {
        const response = await productManager.create(req.body);
        console.log("response on create",response);
        res.status(201).json({
            message: 'Product created successfully.'
        });
    } catch (err) {
        res.status(400).json({ 
            message: err.message 
        });
    }
});

module.exports = router;