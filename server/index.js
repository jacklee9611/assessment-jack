const express = require("express"); // create express variable for an instance of express framework
const app = express(); // then create app variable for an instance of express
const cors = require("cors");

app.use(express.json()); // to parse incoming JSON data from HTTP requests and make it available in the route handlers as JavaScript objects.
app.use(cors()); // use the "cors" middleware to enable or configure CORS for the server

const db = require("./models");

// Routers
const productsRouter = require("./routes/Products");
app.use("/products", productsRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
