module.exports = (app) => {
  const account = require("@src/controllers/accounts.controller");
  var router = require("express").Router();
  router.post("/signup", account.SignUp);
  router.get("/users", account.getUser);
  // router.get("/messages", account.getMessage);
  router.post("/send_message", account.sendMessage);
  router.get("/get_messages/:accountId", account.getConversation);
  router.post("/get_messages_data/", account.getMessage);

  app.use("/api", router);
};
