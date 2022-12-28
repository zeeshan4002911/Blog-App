const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    email: String
})

module.exports = mongoose.model("blog", blogSchema);