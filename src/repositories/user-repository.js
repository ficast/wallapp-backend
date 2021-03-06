"use strict";
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.get = async () => {
  const res = await User.find({}, "id, name");
  return res;
};

exports.create = async (data) => {
  const user = new User(data);
  const res = await user.save();
};

exports.authenticate = async (email) => {
  const res = await User.findOne({
    email,
  });
  return res;
};

exports.getById = async (id) => {
  const res = await User.findById(id);
  return res;
};

exports.delete = async (email) => {
  const res = await User.findOneAndRemove({ email });
  return res;
};
