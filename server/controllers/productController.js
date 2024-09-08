const router = require('express').Router();

const productManager = require('../managers/productManager');

router.post('/create', async (req, res) => {
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