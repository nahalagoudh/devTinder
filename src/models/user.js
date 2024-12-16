// const mongoose = require("mongoose");


// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String
//     },
//     lasttName: {
//         type: String
//     },
//     emailId: {
//         type: String
//     },
//     password: {
//         type: String
//     },
//     age: {
//         type: Number
//     },
//     gender: {
//         type: String
//     }

// })

// const userModel = mongoose.model("User", userSchema)
// module.exports = userModel;


const mongoose = require("mongoose");
var validator = require('validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2
    },
    lasttName: {
        type: String
    },
    emailId: {
        type: String,
        unique: true,
        index: true,
        required: true,
        trim: true,
        lowercase: true,
        minLength: [10, 'Email is too short or invalid'],
        maxLength: [40, 'Email is too long or invalid'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email')
            }

        }

    },
    age: {
        type: Number,

    },
    gender: {
        type: String,
        lowercase: true,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("gender data not valid")
            }
        }
    },
    description: {
        type: String,
        default: "deafult address:null"
    },
    skills: {
        type: [String]

    }
})


const User = mongoose.model("People", UserSchema)

// const People = mongoose.model("People", UserSchema);

module.exports = User;