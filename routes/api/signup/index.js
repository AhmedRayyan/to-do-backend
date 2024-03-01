const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const emailregex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi




router.post('/', async (req, res) => {

    if (req.body.email && req.body.password && req.body.name) { // Check if email, password & name is provided

        // Check if email is valid
        if (!emailregex.test(req.body.email)) {
            res.json({ res: "Please Provide a Valid Email" });
            return;
        }
        // Check if Email Already Exists
        await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if (user) {
                res.json({ res: "User Already Exists, You Can Sign in" });
            }
            // If Email Doesn't Exist, Hash The Password Then Create User
            else {
                bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
                    await prisma.user.create({
                        data: {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        }
                    }).then((user) => {
                        res.json({ user: user, success: true });
                    }).catch((err) => {
                        res.json({ success: false });
                        console.log(err);
                    });
                });
            }
        }).catch((err) => {
            console.log(err);
        });





    }

// If Email, Password or Name is not provided
    else {
        res.json({ res: "Please Provide Your Name, Email & Password to Signup" });
    }
});


module.exports = router;