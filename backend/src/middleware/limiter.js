

const rateLimit = require("express-rate-limit");
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});

export const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit to 5 requests per minute
    message: 'Too many login attempts. Please try again later.'
  });