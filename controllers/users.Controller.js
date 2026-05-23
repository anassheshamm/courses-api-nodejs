const User = require("../models/user.model");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
    const limit = parseInt(req.query.limit) || 2;
    const page = parseInt(req.query.page)|| 1;
    const skip = (page - 1) * limit;

    const users = await User.find({}, "-__v -password").limit(limit).skip(skip);
    res.json({status: httpStatusText.SUCCESS, data: {users}});
};


const getUserProfile = async (req, res) => {
        const user = req.currentUser.id; // Get the current user information from the request object (set by verifyToken middleware)
        const userProfile = await User.findById(user, "-__v -password"); // Fetch the user profile from the database, excluding sensitive fields
        if (!userProfile) {
            return res.status(404).json({status: httpStatusText.FAIL, message: "User not found"});
        }
        res.json({status: httpStatusText.SUCCESS, data: {userProfile}}); // Send the user profile in the response
    
}


const registerUser = async (req, res) => {
    const {firstname, lastname, email, password, role} = req.body;

    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({status: httpStatusText.FAIL, message: "Email already exists"});
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role
        });

            await user.save(); 
            res.status(201).json({status: httpStatusText.SUCCESS, data: {user}});
}


const loginUser = async (req, res) => {
    const {email, password,} = req.body;

    const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({status: httpStatusText.FAIL, message: "Invalid email or password"});   
}

    const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({status: httpStatusText.FAIL, message: "Invalid email or password"});   
}

// Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({status: httpStatusText.SUCCESS, message: "Login successful", data: { token }});
}






module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    getUserProfile
};
