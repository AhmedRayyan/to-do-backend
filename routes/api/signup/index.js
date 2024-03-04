const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const emailregex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi



/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User Signup
 *     description: Registers a new user.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: userData
 *         description: User information for signup.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: User's name.
 *             email:
 *               type: string
 *               description: User's email address.
 *             password:
 *               type: string
 *               description: User's password.
 *         required:
 *           - name
 *           - email
 *           - password
 *     responses:
 *       200:
 *         description: User successfully registered.
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: string
 *               description: ID of the newly created user.
 *             success:
 *               type: boolean
 *               description: Indicates whether the operation was successful.
 *       400:
 *         description: Invalid request body.
 *         schema:
 *           type: object
 *           properties:
 *             res:
 *               type: string
 *               description: Error message indicating invalid request.
 *       409:
 *         description: User already exists.
 *         schema:
 *           type: object
 *           properties:
 *             res:
 *               type: string
 *               description: Error message indicating user already exists.
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates whether the operation was successful.
 */

router.post('/', async (req, res) => {

    if (req.body.email && req.body.password && req.body.name) { // Check if email, password & name is provided

        // Check if email is valid
        if (!emailregex.test(req.body.email)) {
            res.json({ res: "Please Provide a Valid Email" });
            return;
        }
        // Check if Email Already Exists
        await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if (user) {
                res.json({ res: "User Already Exists, You Can Sign in" });
            }
            // If Email Doesn't Exist, Hash The Password Then Create User
            else {
                bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
                    await prisma.user.create({
                        data: {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        }
                    }).then((user) => {
                        res.json({ user: user.id, success: true });
                    }).catch((err) => {
                        res.json({ success: false });
                        console.log(err);
                    });
                });
            }
        }).catch((err) => {
            console.log(err);
        });





    }

// If Email, Password or Name is not provided
    else {
        res.json({ res: "Please Provide Your Name, Email & Password to Signup" });
    }
});


module.exports = router;