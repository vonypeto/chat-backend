module.exports = (mongoose) => {
  var houseHoldSchema = mongoose.Schema(
    {
      _id: { type: mongoose.Schema.Types.ObjectId },
      address: { type: String },
      house_status: { type: String },
      house_number: { type: String },
      household_name: { type: String },
    },
    { timestamps: true }
  );
  houseHoldSchema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.household_id = _id;
    return object;
  });
  const HouseHold = mongoose.model("households", houseHoldSchema);
  return HouseHold;
};
