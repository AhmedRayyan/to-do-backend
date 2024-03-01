const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => { 
    console.log(req.body);
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    console.log(await bcrypt.compare(password,user.password));
    if (user != null && (await bcrypt.compare(password,user.password))) {
        res.json({ message: 'Logged In' , data : {user: user.name, email: user.email}});
        return;
    }
   
    else {
        res.json({ message : 'Invalid Email Or Password' });
    }
}
)


module.exports = router;