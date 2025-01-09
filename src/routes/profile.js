const express = require("express");
// const User = require("../models/user")

const profileRouter = express.router();
const auth = require("../middleware/auth")


profileRouter.get("/profile", auth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)

    } catch (err) {
        res.status(400).send("ERR:" + err.message)
    }
})
