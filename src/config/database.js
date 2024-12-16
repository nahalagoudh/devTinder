const mongoose = require("mongoose");


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://goudhnahla:UVaxWjCXuvyc6rPp@namastenode.mjyn4.mongodb.net/devTinder")


}

module.exports = connectDB

