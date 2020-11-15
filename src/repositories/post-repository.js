"use strict";
const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.get = async (page) => {
  const items = await Post.find({})
    .sort({ updatedAt: "desc", createdAt: "desc" })
    .populate("author", "name")
    .skip(page * 10)
    .limit(10);

  const totalItems = await Post.find({});
  const pages = Math.ceil(Array.from(totalItems).length / 10);

  return { items, pages };
};

exports.create = async (data) => {
  const post = new Post(data);
  await post.save();
};

exports.update = async (id, data) => {
  await Post.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      body: data.body,
    },
  });
};

exports.delete = async (id) => {
  await Post.findOneAndRemove(id);
};
