"use strict";
const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.get = async (page) => {
  const res = await Post.find({})
    .sort({ updatedAt: "desc", createdAt: "desc" })
    .populate("author", "name");
  const pages = Math.ceil(res.length() / 10);
  const items = await res.skip(page * 10).limit(10);

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
