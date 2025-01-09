const express = require("express");
const authRouter = express.router();
const User = require("../models/user");
const { ValidateSignupdata } = require('../utils/Validation')
const bcrypt = require('bcrypt');



authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Email")
        }
        const isVliadpassword = await bcrypt.compare(password, user.password)
        const token = await user.getJWT();
        console.log(token)
        if (isVliadpassword) {
            res.cookie("token", token,
                { expires: new Date(Date.now() + 8 * 3600000) }
            )
            res.send("Login successfully")
        } else {
            throw new Error("Incorrect Password")
        }

    } catch (error) {
        res.status(400).send(error.message)

    }
})


authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailId, password: passwordHash })
        ValidateSignupdata(req)
        await user.save();
        res.send("User added successfully!")
    } catch (error) {
        res.status(400).send(error.message)
    }

})

app.get("/profile", auth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)

    } catch (err) {
        res.status(400).send("ERR:" + err.message)
    }
})
