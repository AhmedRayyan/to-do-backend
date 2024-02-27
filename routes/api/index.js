const express = require("express");
const router = express.Router();


router.use("/login", require("./login"))
router.use("/signup", require("./signup"))


router.all("/", (req, res) => {
    res.sendStatus(501);
})


module.exports = router;