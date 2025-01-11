const session = require('express-session');

const sessionConfig = {
    secret: process.env.COOKIE_SECRET, // DO NOT USE THIS IN PRODUCTION
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production", // Only for local HTTP (NOT for production)
        httpOnly: true,
        sameSite: 'lax', // Use 'lax' for local testing on different ports. Change to 'strict' for production
        maxAge: 1000*60*60
    },
};

module.exports = sessionConfig;