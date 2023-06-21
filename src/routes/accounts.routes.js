module.exports = (app) => {
  const account = require("@src/controllers/accounts.controller");
  var router = require("express").Router();
  router.post("/signup", account.SignUp);
  router.get("/users", account.getUser);
  router.get("/messages", account.getMessage);

  app.use("/api", router);
};
