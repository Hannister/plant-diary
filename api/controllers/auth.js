const User = require("../models/user"); // Import the User model
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({
        user: { name: user.name, email: user.email },
        token,
    });
};
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }

    // Find the user by username
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
        throw new UnauthenticatedError("User not found");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await user.complePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid password");
    }

    // Generate a JWT token and send it as a response
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: { name: user.name, email: user.email },
        token,
    });
};

module.exports = { register, login };
