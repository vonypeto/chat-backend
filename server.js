require("dotenv").config();

// Declare Middleware
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);

// Declare Connection
const connectionDatabase = require("./apps/config/db.connection");

// Database & Firebase Connection
connectionDatabase();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Routes
require("./apps/routes/")(app);

// Welcome page
app.get("/", (req, res) => {
  res.send("Hi :)");
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
