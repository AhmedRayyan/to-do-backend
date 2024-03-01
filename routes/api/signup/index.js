const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;



router.post('/', async (req, res) => {

    if (req.body.email && req.body.password && req.body.name) {

        await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if (user) {
                res.json({ res: "User Already Exists, You Can Sign in" });
            }
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
    
    else {
        res.json({ res: "Please Provide Your Name, Email & Password to Signup" });
    }
});


module.exports = router;