const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');


app.use(session({
  secret: 'xjoewnfas45a2s4df5c',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 60000 * 60 * 24 * 7 , httpOnly: true}
}));
app.use(("*"),express.urlencoded({ extended: true }));
app.use(("*"),express.json());


app.use("/api", require("./routes/api"));



// 404 Not Found
app.get("*", (req, res) => {
  res.status(404).send("Not Found");
})


app.listen(PORT, () => {
  console.log(`Server Working On Port ${PORT}\n`);
});