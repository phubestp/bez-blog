const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    created_at: { type : Date, default: Date.now },
    content: String,
    description: String,
    preview_image: String,
    tag: String,
})

const PostModel = mongoose.model('posts', postSchema)

module.exports = PostModel;