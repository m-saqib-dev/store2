const User = require('./userSchema')

async function findEmail(email) {
    return await User.findOne({ email });
}
async function signUp(user) {
    try {
        const newUser = await User.create({ ...user });
        return newUser;
    } catch (err) { 
        throw err;
    }
}
async function logIn(email, candidatePassword) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await user.comparePassword(candidatePassword);
        if (!isMatch) {

            throw new Error('Invalid password');
        }
        return user;
    } catch (error) {
        throw error;
    }
}


module.exports = {findEmail,signUp,logIn}