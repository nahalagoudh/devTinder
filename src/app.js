const express = require("express");
const { auth } = require("./middleware/auth")

const app = express();


app.use("/user", (req, res, next) => {
    console.log("firset response");

    next()
},
    (req, res, next) => {
        console.log("2nd response")
        res.send("success!!!!!!")
        next()

    },
    (req, res, next) => {
        console.log("3rd response")
        res.send("3rd response")

    })


app.listen(7777, () => {
    console.log("srever has bee intiitaliased");
})