const jwt = require('jsonwebtoken')
const User = require("../models/user")


const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Invalid token")
        }
        const decodedVal = await jwt.verify(token, "secretcode123@", { expiresIn: "1d" })
        const { _id, iat } = decodedVal;
        const user = await User.findById(_id);

        if (!user) {
            throw new Error("User doesnt exist")
        }
        req.user = user;
        next()

    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    auth
}
