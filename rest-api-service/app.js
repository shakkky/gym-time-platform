const express = require("express");
var cors = require('cors');
const app = express();
const routes = require("./routes");

/**
 * 
 * Set up local express server to run unit tests.
 * Express will process requests to different routes based on the routes provided below.
 * 
 */

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  return res.json({ operational: true });
});

module.exports = app;