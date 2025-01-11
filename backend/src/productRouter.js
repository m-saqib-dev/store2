const express = require('express');
const productController = require('./productController');

const router = express.Router();

// Route to get all products
router.get('/products', productController.getAllProducts);

// Route to get a single product by ID
router.get('/products/:id', productController.getProductById);
router.post('/product', productController.createProduct);
// Route to render product page using EJS
// Route to render product page using EJS
// router.get('/product/:id/view', (req, res) => {
//     const productId = req.params.id;
//     productController.getProductById(req, res, (err, product) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.render('product', { product });
//         }
//     });
// });
// Route to render all products page using EJS

module.exports = router;