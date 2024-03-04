const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     description: Authenticates user and generates access token.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials for login.
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: User's email address.
 *             password:
 *               type: string
 *               description: User's password.
 *         required:
 *           - email
 *           - password
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Success message.
 *             accessToken:
 *               type: string
 *               description: Generated access token.
 *       401:
 *         description: Invalid password.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message.
 *       404:
 *         description: Invalid email or password.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message.
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message.
 */

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
        res.status(401).json({message: "Invalid Email Or Password"});
        }
    } else {
        res.status(404).json({message: "Invalid Email Or Password"});
    }
});


module.exports = router;