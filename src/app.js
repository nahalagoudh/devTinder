const express = require("express");
const connectDB = require('./config/database');

const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser")
const { auth } = require("./middleware/auth")


const app = express();

app.use(express.json())
app.use(cookieParser())


app.get("/user", async (req, res) => {
    const user = new User(req.body)
    console.log(URLSearchParams)
    try {
        const user = await User.findOne({ _id: req.body._id })
        if (user.length === 0) {
            res.status("404").send("User bot found")
        } else {
            res.send(user)
        }

    } catch {

    }
})

app.get("/feed", async (req, res) => {
    // const user = new User(req.body)
    try {
        const user = await User.find({ emailId: req.body.emailId })
        if (user.length === 0) {
            res.status("404").send("no user found")
        } else {
            res.send(user)
        }
    } catch {
    }
})

app.delete("/delete", async (req, res) => {
    const id = req.body.id
    try {
        await User.findByIdAndDelete(id)
        res.send("user deleted successfully")
    } catch {
        res.status('404').send("user deleted successfully")
    }
})

app.patch("/user/:_id", async (req, res) => {
    const _id = req.params?._id;
    const { ...updateData } = req.body;

    console.log("ID:", _id, "Update Data:", updateData);
    try {
        const ALLOWED_UPDATES = ["firstName", "lasttName", "emailId", "age", "gender", "description", "skills"]
        const isupdateAllowed = Object.keys(updateData).every(k =>
            ALLOWED_UPDATES.includes(k)
        )

        if (!isupdateAllowed) {
            throw new Error("Updation not allowed")
        }
        if (updateData.skills.length > 10) {
        }
        const user = await User.findByIdAndUpdate(_id, updateData,
            {
                returnDocuments: "after",
                runValidators: true
            })
        // console.log(user)
        res.send("user data updated successfully")
    } catch (error) {
        // res.send(error.message)
        res.status('400').send(error.message)
    }
})


connectDB().then(() => {
    console.log("database connection established")
    app.listen(7777, () => {
        console.log("srever has bee intiitaliased");
    })

}).catch((err) => {
    console.log("database connection error!!!")
})




// app.post("/signup", async (req, res) => {
//     const user = new userModel({
//         firstName: "nahala",
//         lasttName: "g",
//         emailId: "ngm@gmail.com",
//         gender: "male"
//     })
//     await user.save()
//     res.send("User added successfully!")
// })
