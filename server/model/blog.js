const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    email: String
}, { timestamps: true })

module.exports = mongoose.model("blog", blogSchema);