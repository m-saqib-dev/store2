const { validateLogin, redirectIfAuthenticated } = require('../middleware/authMiddleware');
const passport = require('../strategies/local')
const express = require('express')
const router = express();

router.post('/login', validateLogin,(req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'An internal error occurred.' });
        }
        if (!user) {
            return res.status(400).json({ error: info.message }); 
        }
        req.login(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ error: 'Login failed.' });
            }
            return res.status(200).json({ message: 'Login successful!', user });
        });
    })(req, res, next)}
)
router.get('/session', (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({ loggedIn: true, user: req.user });
    } else {
        return res.status(401).json({ loggedIn: false });
    }
});

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out.' });
        }
        req.session.destroy(() => {
            res.status(200).json({ message: 'Logged out successfully.' });
        });
    });
});
router.get('/login', redirectIfAuthenticated, (req, res) => {
    res.render('login'); // Render the login page
});

module.exports = router
