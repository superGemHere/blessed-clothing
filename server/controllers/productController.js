const router = require('express').Router();
const productManager = require('../managers/productManager');
const {auth} = require('../middlewares/authMiddleware'); // Import your middleware

// Apply the verifyToken middleware to the product creation route
router.post('/create', auth, async (req, res) => {
    try {
        const response = await productManager.create(req.body);
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