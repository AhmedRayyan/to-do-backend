const express = require("express");
const app = express();
const PORT = 8080;


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