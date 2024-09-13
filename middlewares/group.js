const Group = require("../models/group");
const { groupSchema } = require("../schemas/groupSchema");
const ExpressError = require("../utils/expressError");

module.exports.isGroup = async (req, res, next) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId);
  if (!group) {
    req.flash("error", "Group does not exist!");
    return res.redirect("/groups");
  }
  req.group = group;
  next();
};

module.exports.isGroupOwner = async (req, res, next) => {
  const id = req.params.groupId;
  const group = await Group.findById(id).populate("owner");
  if (!group || !group.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that.");
    return res.redirect(`/groups/${id}`);
  }
  next();
};

module.exports.isGroupMember = async (req, res, next) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId);
  if (!group) {
    req.flash("error", "Group not found.");
    return res.redirect("/groups");
  }
  const isMember = group.members.some((member) => member.equals(req.user._id));
  if (!isMember) {
    req.flash("error", "You need to join the group to access this.");
    return res.redirect(`/groups`);
  }
  next();
};

module.exports.validateGroup = (req, res, next) => {
  const { error } = groupSchema.validate(req.body.group);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};
