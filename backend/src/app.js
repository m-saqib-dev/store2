const express = require('express');
const connectDB = require('./database');
const authRouter = require('./authRouter');
const authRouterV2 = require('./routes/authRoutes')
const productRouter = require('./productRouter'); // Fixed typo
const sessionConfig = require('./config/session');
const session = require('express-session');
const viewsRouter = require('./viewsRoute/viewsRouter');
const path = require('path');
const cors = require('cors');
const passport = require('./strategies/local'); 
require('dotenv').config();

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow cookies to be sent
}));
app.use(passport.initialize());
app.use(passport.session());

// Database connection
connectDB();

// Routes
app.use('/api/v1/', authRouter);
app.use('/api/v1/', productRouter); // Fixed typo
// app.use('/', viewsRouter);
app.use('/api/v2/',authRouterV2)

// Home route
// app.get('/', (req, res) => {
//     res.render('layout', { title: 'Home Page' });
// });

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
