const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => { 
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
        email: email
        }
    });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json({message:"Logged In Successfully", accessToken: accessToken });
        } else {
        res.status(401).json({message: "Invalid Password"});
        }
    } else {
        res.status(404).json({message: "Invalid Email Or Password"});
    }
});


module.exports = router;