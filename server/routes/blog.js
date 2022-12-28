const route = require("express").Router();
const Blog = require("../model/blog.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const multer = require('multer')
const HASH_KEY = process.env.HASH_KEY || "zeesh1234@";

// Middleware for token authentication
const tokenAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({
            status: "Failed",
            message: "Token is Missing"
        })
    }
    try {
        jwt.verify(token, HASH_KEY, function (err, decoded) {
            if (err) return res.status(403).json({
                status: "Failed",
                mesage: "Not a valid token"
            })
            req.logged_in_email = decoded.data;
            next();
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: "Internal Server Error" + err.message
        })
    }
}

// Multer middleware for image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

route.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

route.post("/", tokenAuth, upload.single('image'), async function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    try {
        const data = new Blog({
            title: req.body.title,
            description: req.body.description,
            image: req.file.filename,
            email: req.logged_in_email
        })
        await data.save();
        res.status(200).json({
            status: "Success",
            message: "Blog Posted Succesfully"
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: "Internal Server Error" + err.message
        })
    }
})

route.get("/", async (req, res) => {
    try {
        Blog.find().exec((err, data) => {
            if (err) return res.status(500).json({
                status: "Failed",
                message: err.message
            })
            res.status(200).json({
                status: "Success",
                data: data
            })
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: "Internal Server Error" + err.message
        })
    }
})

module.exports = route;