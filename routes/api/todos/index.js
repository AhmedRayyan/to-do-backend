const express = require('express');
const router = express.Router();
const authenticateToken = require("../../../middlewares/Auth");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get User's Todos
 *     description: Retrieves todos of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of user's todos retrieved successfully.
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               description: List of todos.
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Todo ID.
 *                   title:
 *                     type: string
 *                     description: Todo title.
 *                   completed:
 *                     type: boolean
 *                     description: Indicates whether the todo is completed.
 *                   userid:
 *                     type: integer
 *                     description: User ID associated with the todo.
 *       401:
 *         description: Unauthorized. User token not provided or invalid.
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Error message.
 */

router.get("/", authenticateToken, async (req, res) => { 
    const todos = await prisma.todo.findMany({ where: { userid: req.user.id } });
    res.json({ data: todos });
});

module.exports = router;