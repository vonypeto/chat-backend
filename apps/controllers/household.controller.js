const db = require("../models");
var mongoose = require("mongoose");
const HouseHoldMembers = db.household_members;
const HouseHoldName = db.households;

exports.createHouseHold = async (req, res) => {
  // const household_members = req.body.household_members;

  try {
    const { household_members, household_name } = req.body;
    const houseHoldId = new mongoose.Types.ObjectId();

    console.log(household_members);
    household_name._id = houseHoldId;
    const houseHoldData = new HouseHoldName(household_name);
    await houseHoldData.save();
    household_members.map(async (i) => {
      const HouseHoldMemberTmp = i;
      HouseHoldMemberTmp.household_members_id = houseHoldId;
      HouseHoldMemberTmp._id = new mongoose.Types.ObjectId();
      const houseHoldMembersData = new HouseHoldMembers(HouseHoldMemberTmp);
      await houseHoldMembersData.save();
    });
    res.json("saved");
  } catch (error) {
    console.log(error.message);
  }
};
