const express = require('express');
const router = express.Router();
const authenticateToken = require("../../../middlewares/Auth");

router.get("/", authenticateToken , (req, res) => { 
    res.json({message: `Welcome ${req.user.name}! You are now logged in.`});
});

module.exports = router;