const route = require("express").Router();
const User = require("../model/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = 10;
const HASH_KEY = process.env.HASH_KEY || "zeesh1234@";

route.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            res.status(400).json({
                status: "Failed",
                message: "User with that email already exists"
            })
        }
        bcrypt.hash(password, saltRounds, async function (err, hash_password) {
            if (err) { return console.log("Unable to encode the Password", err.message) }
            const new_user = new User({
                email: email,
                password: hash_password
            })
            await new_user.save();
            return res.status(200).json({
                status: "Success",
                message: "User Registered succesfully"
            })
        });
    }
    catch (err) {
        res.status(500).json({
            status: "Failed",
            message: "Internal Server Error"
        })
    }
})

route.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = await jwt.sign({
                    data: user.email
                }, HASH_KEY, { expiresIn: '1h' });

                return res.status(200).json({
                    status: "Success",
                    message: "Login Successfully",
                    token
                })
            } else {
                res.status(403).json({
                    status: "Failed",
                    message: "Password is incorrect"
                })
            }
        } else {
            res.status(404).json({
                status: "Failed",
                message: "Doesn't Find the account.... Please register"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: "Failed",
            message: "Internal Server Error"
        })
    }
})

module.exports = route;