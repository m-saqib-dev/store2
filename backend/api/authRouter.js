const { signUpController, loginController } = require("./authController")

const router = require("express").Router()

router.post('/signup',signUpController)
router.post('/login',loginController)
const requireLogin = (req, res, next) => {
    if (req.session.user) { // Check if req.session.user exists
        next(); // User is logged in, proceed
    } else {
        res.status(401).json({ message: 'Unauthorized' }); // Or redirect to login
    }
};

// Example protected route


module.exports = router