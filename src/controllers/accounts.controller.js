const db = require("@src/models");
var mongoose = require("mongoose");
const Account = db.accounts;
const Message = db.messages;

exports.SignUp = async (req, res) => {
  try {
    const _id = new mongoose.Types.ObjectId();

    const users = await Account.findOne({ email: req.body.email });
    if (users != null) {
      return res.status(400).json("Email already exists!");
    }

    const newUser = new Account({
      _id: _id,
      email: req.body.email,
      uid: req.body.full_name,
      username: req.body.username,
    });
    await newUser.save();
    res.json(req.body);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    await Account.find({}, (err, users) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to retrieve users" });
      } else {
        res.json(users);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.getMessage = async (req, res) => {
  try {
    Message.find({}, (err, messages) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to retrieve messages" });
      } else {
        res.json(messages);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
