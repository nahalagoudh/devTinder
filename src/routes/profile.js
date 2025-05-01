const express = require("express");
const { ValidateEditdata } = require("../utils/Validation")
const profileRouter = express.Router();
const { auth } = require("../middleware/auth")


profileRouter.get("/profile/view", auth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    } catch (err) {
        res.status(400).send("ERR:" + err.message)
    }
})


profileRouter.patch("/profile/edit", auth, async (req, res) => {
    try {
        if (!ValidateEditdata(req)) {
            throw new Error("Edit fields not allowed");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key])
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName} have updated profile succeffully`,
            data: loggedInUser
        })

    } catch (err) {
        res.status(400).send("ERR:" + err.message);
    }
})

module.exports = profileRouter;