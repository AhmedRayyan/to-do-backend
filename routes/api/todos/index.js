const express = require('express');
const router = express.Router();
const authenticateToken = require("../../../middlewares/Auth");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.get("/", authenticateToken, async (req, res) => { 
    const todos = await prisma.todo.findMany({ where: { userid: req.user.id } });
    res.json({ data: todos });
});

module.exports = router;