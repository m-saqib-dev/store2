const { signUp, logIn, findEmail } = require("./authService");
const validator = require('validator');

const signUpController = async (req, res) => {
    try {
        const { email, password ,first_name, last_name} = req.body;

        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({ error: "Email, password, first name, and last name are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "Password is not strong enough" });
        }
        
        const user = await signUp(({email, password,first_name,last_name}));
        res.status(201).json({success:true, message: "Registration successful", user });
    } catch (err) {
        // console.log(err)
        if (err.code === 11000 || err.code === 11001) { 
            return res.status(400).json({ error: "Email already exists" });
        }
        if (process.env.NODE_ENV === 'production') {
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    try {
        const user = await logIn(email, password);

        req.session.user = {id:user._id,email:user.email}
        console.log("Session set:", req.session);
        res.status(200).json({ success:true, message: "Login successful", user:{email:user.email} });
    } catch (error) {
        console.log(error.message)
        if (error.message === "User not found") {
            return res.status(404).json({ success:false,message: "User not found" });
        }
        if (error.message === "Invalid password") {
            return res.status(401).json({ success:false, message: "Invalid password" });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    signUpController,
    loginController
};