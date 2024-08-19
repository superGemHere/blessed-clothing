const router = require('express').Router();

const userController = require('./controllers/userController');
const shoeController = require('./controllers/shoeController');

router.use('/users', userController);
router.use('/products', shoeController);

module.exports = router;