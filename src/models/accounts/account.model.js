module.exports = (mongoose) => {
  var accountSchema = mongoose.Schema(
    {
      _id: { type: mongoose.Schema.Types.ObjectId },
      username: { type: String },
      status: { type: String },
      uid: { type: String },
      email: { type: String },
      conversation_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "conversations",
        },
      ],
    },
    { timestamps: true }
  );
  accountSchema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.account_id = _id;
    return object;
  });
  const Account = mongoose.model("accounts", accountSchema);
  return Account;
};
