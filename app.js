const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(("*"),express.urlencoded({ extended: true }));
app.use(("*"),express.json());


app.use("/api", require("./routes/api"));



// 404 Not Found
app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});