const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const dotenv = require("dotenv");
dotenv.config();

const URL = process.env.DATABASE_URL || "mongodb://localhost:27017/blogapp";

async function connection() {
    await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
            const type = (URL === process.env.DATABASE_URL) ? "remote" : "local";
            return console.log(`Succesfully connected with ${type} database`);
        }).catch((err) => {
            return console.log("Failed to connect to database", err)
        })
}

module.exports = connection;