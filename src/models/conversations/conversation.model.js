module.exports = (mongoose) => {
  const conversationSchema = mongoose.Schema(
    {
      _id: { type: mongoose.Schema.Types.ObjectId },
      participants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "accounts",
        },
      ],
    },
    { timestamps: true }
  );
  const conversation = mongoose.model("conversations", conversationSchema);
  return conversation;
};
