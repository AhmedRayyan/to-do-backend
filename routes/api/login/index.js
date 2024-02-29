const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.post('/', async (req, res) => { 
    console.log(req.body);
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    
    if (user != null && user.password === password) {
        res.json({ message: 'Logged In' });
        return;
    }
   
    else {
        res.json({ message : 'Invalid Email Or Password' });
    }
}
)


module.exports = router;