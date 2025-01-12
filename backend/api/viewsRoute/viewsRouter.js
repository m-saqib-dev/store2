const express = require('express');
const productController = require('../productController');
const { requireLogin } = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/profile', requireLogin, (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).render('error', { error: 'User not logged in' });
        }
        res.render('profile', { user: req.session.user }); // Access user data from session
    } catch (error) {
        console.error("Error :", error);
        res.status(500).render('error', { error: error });
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await productController.getAllProducts()
        res.render('products', { products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).render('error', { error: error });
    }
});

router.get('/login', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

module.exports = router