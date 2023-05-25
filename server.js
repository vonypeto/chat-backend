const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("Hi there");
});
app.get("/", (req, res) => {
  res.send("Hi there");
});
app.listen(5000, () => {
  console.log("Listen on the port 5000...");
});
