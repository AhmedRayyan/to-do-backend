const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.post('/', async (req, res) => {

    if (req.body.email && req.body.password && req.body.name) {
        
        prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }}).then((user) => {
            res.json({ user: user, success: true });
        }).catch((err) => {
            res.json({ success: false });
            console.log(err);
        });
        
    }
    
    else {
        res.json({ res: "Please Provide Your Name, Email & Password to Signup" });
    }
});


module.exports = router;