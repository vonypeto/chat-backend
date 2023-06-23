const db = require("@src/models");
var mongoose = require("mongoose");
const Account = db.accounts;
const Message = db.messages;
const Conversation = db.conversation;

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
      uid: req.body.uid,
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
exports.getMessage2 = async (req, res) => {
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

exports.sendMessage = async (req, res) => {
  try {
    const _id = new mongoose.Types.ObjectId();
    const _id2 = new mongoose.Types.ObjectId();

    console.log(req.body);
    const data = req.body;

    // await Account.updateOne(
    //   { _id: data.senderId },
    //   { $addToSet: { conversation_id: _id } }
    // );
    // const conversation = await Conversation.findById(req.body.conversation_id);

    const senderDataId = await Account.find({ uid: data.senderId }).select({
      uid: 1,
      _id: 1,
    });
    const recipientId = await Account.find({ uid: data.recipientId }).select({
      uid: 1,
      _id: 1,
    });
    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderDataId[0]._id, recipientId[0]._id],
      },
    });
    if (!conversation) {
      console.log("not exist");
      const newConversation = await Conversation({
        _id: _id,
        participants: [senderDataId[0]._id, recipientId[0]._id],
      });
      await newConversation.save();
      console.log(senderDataId[0]._id);
      await Account.findOneAndUpdate(
        {
          _id: senderDataId[0]._id,
        },
        { $push: { conversation_id: _id } }
      );
      await Account.findOneAndUpdate(
        {
          _id: recipientId[0]._id,
        },
        { $push: { conversation_id: _id } }
      );
      const messageData = await Message({
        _id: _id2,
        conversation_id: _id,
        message: req.body.message,
        account_id: senderDataId[0]._id,
        senderId: req.body.senderId,
      });
      await messageData.save();
      res.json({ id: _id });
    } else {
      console.log("exist");

      const messageData = await Message({
        _id: _id2,
        conversation_id: req.body.conversation_id,
        message: req.body.message,
        account_id: senderDataId[0]._id,
        senderId: req.body.senderId,
      });
      await messageData.save();
      res.json({ id: req.body.conversation_id });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { accountId } = req.params;
    console.log(accountId);
    const account = await Account.find({ uid: accountId })
      .populate({
        path: "conversation_id",
        populate: {
          path: "participants",
          model: "accounts",
          select: "uid username",
        },
      })
      .select({ _id: 1, conversation_id: 1 });

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    console.log(account[0]?.conversation_id);
    res.json(account[0]?.conversation_id);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to get conversation" });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { conversation_id } = req.body;
    console.log(conversation_id);
    const messageData = await Message.find({ conversation_id });
    console.log(messageData);
    res.json(messageData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to get conversation" });
  }
};
