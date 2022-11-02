const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Auth = require('../models/AuthSchema')
const auth = require('../middleware/auth')


exports.register = async (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check all filds are fill or not
        if (!(firstName && lastName && email && password)) {
            res.status(400).send("All firds are required")
        }

        // Check User already exists or not
        const existingUser = await Auth.findOne({ email })
        if (existingUser) {
            res.status(400).send("User Already Exists")
        }

        // Hashing Password
        const passHash = await bcrypt.hash(password, 10);

        // Send Details ot database
        const user = await Auth.create({ firstName, lastName, email: email.toLowerCase(), password: passHash });

        // Creating the token
        const token = jwt.sign({ user_id: user._id, email }, process.env.SERECT_KEY, { expiresIn: "2hr" })
        user.token = token;

        // To avoid sending password 
        user.password = undefined;

        res.status(201).json(user)

    } catch (error) {
        console.log(error)
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send('All firds are required');
        }

        // Fetch and check user is their or not
        const user = await Auth.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await jwt.sign({ user_id: user._id, email }, process.env.SERECT_KEY, { expiresIn: "2h" })

            user.token = token;
            user.password = undefined;
            // res.status(200).json(user)


            // if you want to use cookies
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true
            }

            res.status(200).cookie("token", token, options).json({ seccess: true, token, user })
        }

        res.status(400).send("Email or password is not valid")




    } catch (error) {
        console.log(error)
    }
}



exports.dashbord = (req, res) => {
    res.send("Dashbord, Secret information");
}