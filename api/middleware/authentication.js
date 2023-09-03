const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        throw new UnauthenticatedError("Unauthorized");
    }

    jwt.verify(token, "your-secret-key", (err, user) => {
        console.log(user);
        if (err) {
            throw new UnauthenticatedError("Forbidden");
        }
        req.user = user;
        next();
    });

    //course code
    // try {
    //     const payload = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = { userId: payload.userId, name: payload.name };
    //     next();
    // } catch (error) {
    //     throw new UnauthenticatedError("Authentication Invalid");
    // }
};

module.exports = authenticationMiddleware;
