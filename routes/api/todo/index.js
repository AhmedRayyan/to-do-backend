const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require("../../../middlewares/Auth");

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create Todo
 *     description: Creates a new todo for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: todoData
 *         description: Todo information for creation.
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *               description: Content of the todo.
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *               description: Tags associated with the todo (optional).
 *         required:
 *           - content
 *     responses:
 *       200:
 *         description: Todo created successfully.
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: Todo ID.
 *             content:
 *               type: string
 *               description: Content of the todo.
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *               description: Tags associated with the todo.
 *             userid:
 *               type: integer
 *               description: User ID associated with the todo.
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




/**
 * @swagger
 * /todo:
 *   delete:
 *     summary: Delete Todo
 *     description: Deletes a todo of the authenticated user by ID.
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: todoId
 *         description: ID of the todo to be deleted.
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID of the todo.
 *         required:
 *           - id
 *     responses:
 *       200:
 *         description: Todo deleted successfully.
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: Todo ID.
 *             content:
 *               type: string
 *               description: Content of the deleted todo.
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *               description: Tags associated with the deleted todo.
 *             userid:
 *               type: integer
 *               description: User ID associated with the deleted todo.
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



/**
 * @swagger
 * /todo:
 *   delete:
 *     summary: Delete Todo
 *     description: Deletes a todo of the authenticated user by ID.
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: todoId
 *         description: ID of the todo to delete.
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID of the todo to delete.
 *         required:
 *           - id
 *     responses:
 *       200:
 *         description: Todo deleted successfully.
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID of the deleted todo.
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



/**
 * @swagger
 * /todo/{id}:
 *   get:
 *     summary: Get Todo by ID
 *     description: Retrieves a todo by its ID for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the todo to retrieve.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Todo retrieved successfully.
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: Todo ID.
 *             content:
 *               type: string
 *               description: Content of the todo.
 *             status:
 *               type: string
 *               description: Status of the todo.
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *               description: Tags associated with the todo.
 *             userid:
 *               type: integer
 *               description: User ID associated with the todo.
 *       401:
 *         description: Unauthorized. User token not provided or invalid.
 *       404:
 *         description: Todo not found.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Error message.
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Error message.
 */
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