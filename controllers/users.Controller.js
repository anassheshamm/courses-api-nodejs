const User = require("../models/user.model");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcryptjs"); 

const getAllUsers = async (req, res) => {
    const limit = parseInt(req.query.limit) || 2;
    const page = parseInt(req.query.page)|| 1;
    const skip = (page - 1) * limit;

    const users = await User.find({}, "-__v -password").limit(limit).skip(skip);
    res.json({status: httpStatusText.SUCCESS, data: {users}});
};


const registerUser = async (req, res) => {
    const {firstname, lastname, email, password} = req.body;

    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({status: httpStatusText.FAIL, message: "Email already exists"});
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

            await user.save(); 
            res.status(201).json({status: httpStatusText.SUCCESS, data: {user}});
    } catch (error) {
        res.status(400).json({status: httpStatusText.ERROR, message: error.message, code:400});
    }
}


const loginUser = async (req, res) => {
    try {
const {email, password} = req.body;

const user = await User.findOne({email});
if (!user) {
    return res.status(400).json({status: httpStatusText.FAIL, message: "Invalid email or password"});   
}

const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
    return res.status(400).json({status: httpStatusText.FAIL, message: "Invalid email or password"});   
}

res.status(200).json({status: httpStatusText.SUCCESS, message: "Login successful"});


}catch (error) {
    res.status(500).json({status: httpStatusText.ERROR, message: error.message, code:500});
}
}







module.exports = {
    getAllUsers,
    registerUser,
    loginUser
};
