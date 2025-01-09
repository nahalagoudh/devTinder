const validator = require("validator");

const ValidateSignupdata = (req) => {

    const { firstName, lastName, emailId, password, age, gender, description, skills } = req.body;

    if (!firstName) {
        throw new Error("firstname is required")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter strong password")
    }

}

module.exports = { ValidateSignupdata }