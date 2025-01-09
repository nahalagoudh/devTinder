const jwt = require('jsonwebtoken')
const User = require("../models/user")


const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Invalid token")
        }
        const decodedVal = await jwt.verify(token, "secretcode123@", { expiresIn: "1d" })
        console.log("decodedVal", decodedVal)
        const { _id, iat } = decodedVal;
        const user = await User.findById(_id)
        console.log("user--->", user)

        if (!user) {
            throw new Error("User doesnt exist")
        }
        req.user = user;
        next()

    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {
    auth
}


// const auth = (req, res, next) => {
//     const token = "xyz";
//     const isAuthorizedToken = token === "xyz";
//     if (isAuthorizedToken) {
//         next()
//     } else {
//         res.status(401).send("unauthorized request")
//     }
// }
module.exports = {
    auth
}