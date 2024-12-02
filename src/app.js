const express = require("express");

//server creation
const app = express();


//request Handler
app.use("/test", (req, res) => {
    res.send("You will reach your goal")
})

app.listen(7777, () => {
    console.log("srever has bee intiitaliased");
})