const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require("../../../middlewares/Auth");


// Create a todo
router.post('/', authenticateToken, async (req, res) => {
    const { conntent } = req.body;
    const todo = await prisma.todo.create({
        data: {
            content: conntent,
            tags: req.body.tags || null,
            user: {
                connect: {
                    id: req.user.id
                }
            }
        }
    });
    res.json(todo);
});


// Delete a todo
router.delete('/', authenticateToken, async (req, res) => {
    const todo = await prisma.todo.delete({
        where: {
            id: parseInt(req.body.id),
            user: {
                id: req.user.id
            }
        }
    });
    res.json(todo);
});


// Update a todo by id
router.put('/:id', authenticateToken, async (req, res) => {
    const { content,status,tags } = req.body;
    const todo = await prisma.todo.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            content: content,
            status: status,
            tags: tags,
            user: {
                connect: {
                    id: req.user.id
                }
            }
        }
    });
    res.json(todo);
});


// Get todo by id
router.get('/:id', authenticateToken, async (req, res) => {
    const todo = await prisma.todo.findUnique({
        where: {
            userid: req.user.id,
            id: parseInt(req.params.id)
        }
    });
    if (!todo) {
        return res.status(404).json({ error: "Todo Not found" });
    }
    res.json(todo);
});


module.exports = router;