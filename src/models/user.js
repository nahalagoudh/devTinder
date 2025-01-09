const mongoose = require("mongoose");
var validator = require('validator');
const jwt = require('jsonwebtoken')


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
    password: {
        type: String,
        required: true,
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

UserSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "secretcode123@")
    return token;
}

UserSchema.methods.validatePassword = async function (passwordByInput) {
    const user = this;
    // Nahala@444
    const isValidPassword = await bcrypt.compare(user.password, passwordByInput)
    return isValidPassword;
}


const User = mongoose.model("People", UserSchema)

module.exports = User;