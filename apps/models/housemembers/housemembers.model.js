module.exports = (mongoose) => {
  var houseHoldMemberSchema = mongoose.Schema(
    {
      _id: { type: mongoose.Schema.Types.ObjectId },
      first_name: { type: String },
      last_name: { type: String },
      middle_name: { type: String },
      age: { type: String },
      alias: { type: String },
      civil_status: { type: String },
      household_members_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "households",
      },
    },
    { timestamps: true }
  );
  houseHoldMemberSchema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.household_id = _id;
    return object;
  });
  const HouseHoldMember = mongoose.model(
    "household_members",
    houseHoldMemberSchema
  );
  return HouseHoldMember;
};
