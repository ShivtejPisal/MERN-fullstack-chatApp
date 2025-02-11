const express = require("express");
const Group = require("../models/GroupModel");

const groupRouter = express.Router();

//Create a new Group
groupRouter.post("/", async () => {
  try {
    const { name, description } = req.body;
    const group = await Group.create({
      name,
      description,
      //   admin: req.user._id,
      // member: [req.user._id],
    });
    const populatedGroup = await Group.findById(group._id)
      .populate("admin", "username email")
      .populate("members", "username email");
    res.status(201).json({ populatedGroup });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = groupRouter;
