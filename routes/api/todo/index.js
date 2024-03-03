const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require("../../../middlewares/Auth");


router.get('/:id',authenticateToken, async (req, res) => { 
    const todo = await prisma.todo.findUnique({
        where: {
            userid: req.user.id,
            id : parseInt(req.params.id)
        }
    });
    if (!todo) {
        return res.status(404).json({ error: "Todo Not found" });
    }
    res.json(todo);
});

module.exports = router;