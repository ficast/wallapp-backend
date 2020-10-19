'use strict';
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.get = async() => {
    const res = await Post.find({}).populate('author', 'name')
    return res;
}

exports.create = async(data) => {
    const post = new Post(data);
    await post.save();
}

exports.update = async(id, data) => {
    await Post
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                body: data.body,
            }
        });
}

exports.delete = async(id) => {
    await Post
        .findOneAndRemove(id);
}