const express = require("express");
const router = express.Router();


router.use("/login", require("./login"))
router.use("/signup", require("./signup"))
router.use("/todos", require("./todos"));
router.use("/todo", require("./todo"));


router.all("/", (req, res) => {
    res.sendStatus(501);
})


module.exports = router;