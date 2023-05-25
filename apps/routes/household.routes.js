module.exports = (app) => {
  const houseHold = require("../controllers/household.controller");
  var router = require("express").Router();
  router.post("/create", houseHold.createHouseHold);
  app.use("/api", router);
};
