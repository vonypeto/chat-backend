module.exports = (mongoose) => {
  var messageSchema = mongoose.Schema(
    {
      _id: { type: mongoose.Schema.Types.ObjectId },
      message: { type: String },
      senderId: { type: String },
      account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
      },
      conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversations",
      },
      unread: { type: Boolean },
    },
    { timestamps: true }
  );
  messageSchema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.message_id = _id;
    return object;
  });
  const Account = mongoose.model("messages", messageSchema);
  return Account;
};
