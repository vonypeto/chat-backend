const db = require("../models");
var mongoose = require("mongoose");
const HouseHoldMembers = db.household_members;
const HouseHoldName = db.households;
const pageSizeOptions = [5, 10, 20, 50, 100];

exports.createHouseHold = async (req, res) => {
  // const household_members = req.body.household_members;

  try {
    const houseHoldMemberData = req.body;
    const houseHoldId = new mongoose.Types.ObjectId();

    houseHoldMemberData._id = houseHoldId;
    houseHoldMemberData.household_members_id =
      houseHoldMemberData.household_members_id;

    const houseHoldData = new HouseHoldMembers(houseHoldMemberData);
    await houseHoldData.save();
    // household_members.map(async (i) => {
    //   const HouseHoldMemberTmp = i;
    //   HouseHoldMemberTmp.household_members_id = houseHoldId;
    //   HouseHoldMemberTmp._id = new mongoose.Types.ObjectId();
    //   const houseHoldMembersData = new HouseHoldMembers(HouseHoldMemberTmp);
    //   await houseHoldMembersData.save();
    // });
    res.json("saved");
  } catch (error) {
    console.log(error.message);
  }
};

exports.getHouseHold = async (req, res) => {
  // const household_members = req.body.household_members;
  try {
    let limit = parseInt(req.query.pageSize) || 10;
    limit = pageSizeOptions.includes(limit) ? limit : pageSizeOptions[0];

    const search = req.query.search || "";

    const filterSearch = [
      { first_name: { $regex: search, $options: "i" } },
      { last_name: { $regex: search, $options: "i" } },
      { Middle_name: { $regex: search, $options: "i" } },
    ];
    const getRequestData = await HouseHoldMembers.find({
      $or: filterSearch,
    })
      .skip(req.query.page)
      .sort({ updatedAt: -1 })
      .limit(limit)
      .populate({
        path: "household_members_id",
        model: "household_members",
      });

    res.json(getRequestData);
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateHouseHold = async (req, res) => {
  // const household_members = req.body.household_members;
  try {
    const updateHouseHold = await HouseHoldMembers.findOneAndUpdate(
      {
        _id: req.body.household_id,
      },
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          middle_name: req.body.middle_name,
          age: req.body.age,
          alias: req.body.alias,
          civil_status: req.body.civil_status,
          household_members_id: req.body.household_members_id,
        },
      }
    );
    return res.json(req.body);
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteHouseHold = async (req, res) => {
  // const household_members = req.body.household_members;
  try {
    console.log(req.body);

    const houseHoldMembersDelete = await HouseHoldMembers.deleteMany({
      _id: { $in: req.body.household_id },
    });
    return res.json("success");
  } catch (err) {
    return res.json(err);
  }
};

exports.getHouseHoldSpecificData = async (req, res) => {
  // const household_members = req.body.household_members;
  try {
    const houseHoldData = await HouseHoldMembers.find({
      _id: req.query.id,
    }).populate({
      path: "household_members_id",
      model: "household_members",
    });
    return res.json(houseHoldData);
  } catch (err) {
    return res.json(err);
  }
};
