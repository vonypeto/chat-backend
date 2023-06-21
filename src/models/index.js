const dbConfig = require("@src/config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.accounts = require("./accounts/account.model.js")(mongoose);
db.messages = require("./messages/message.model.js")(mongoose);

module.exports = db;
