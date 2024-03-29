const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(401);

        // Fetch user data from the database using Prisma
        const userData = await prisma.user.findUnique({
            where: { email: user.email }
        });

        if (!userData) return res.sendStatus(403);

        req.user = userData;
        next();
    });
}

module.exports = authenticateToken;