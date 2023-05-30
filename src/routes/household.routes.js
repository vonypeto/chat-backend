module.exports = (app) => {
  const houseHold = require("@src/controllers/household.controller");
  var router = require("express").Router();
  router.post("/create", houseHold.createHouseHold);
  router.post("/update", houseHold.updateHouseHold);
  router.post("/delete", houseHold.deleteHouseHold);

  router.get("/get-family", houseHold.getHouseHold);
  router.get("/get-family/data", houseHold.getHouseHoldSpecificData);
  app.use("/api", router);
};
