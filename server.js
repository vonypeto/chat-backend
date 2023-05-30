require("module-alias/register");
require("dotenv").config();

// Declare Middleware
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);

// Declare Connection
const connectionDatabase = require("@src/config/db.connection");

// test modules
// moduleAlias.addAliases({
//   "@lib": __dirname + "/src",
// });
// console.log(__dirname + "/src");

// Database & Firebase Connection
connectionDatabase();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Routes
require("@src/routes")(app);

// Welcome page
app.get("/", (req, res) => {
  res.send("Hi :)");
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
