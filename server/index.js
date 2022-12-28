const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connection = require("./connection/db.js")
const PORT = process.env.PORT || 3001;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

connection();

// todo routes
app.use("/api/v1/user", require("./routes/user.js"));
app.use("/api/v1/blog", require("./routes/blog.js"));


app.listen(PORT, () => console.log("server is running at port", PORT));