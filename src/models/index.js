const dbConfig = require("@src/config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.households = require("./household/household.model.js")(mongoose);
db.household_members = require("./housemembers/housemembers.model.js")(
  mongoose
);

module.exports = db;
