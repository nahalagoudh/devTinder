const jwt = require('jsonwebtoken')
const User = require("../models/user")


const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Invalid token")
        }
        const decodedVal = await jwt.verify(token, "secretcode123@")
        // console.log("decodedVal", decodedVal)
        // const { _id } = decodedVal
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User doesnt exist")
        }
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