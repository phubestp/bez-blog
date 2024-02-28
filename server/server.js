const PostModel = require('./post.js');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') })

mongoose
    .connect(`mongodb+srv://${process.env['DB_USERNAME']}:${process.env['DB_PASSWORD']}@bez.f1yrlsn.mongodb.net/${process.env['DB_NAME']}`)
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

const app = express();

console.log(process.env)

app.use(express.json());
app.use(cors())

app.listen(8000, () => {
    console.log(`Server Started at ${8000}`)
})

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.get('/api/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const posts = await PostModel.findById(id);
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.get('/api/posts/tag/:tag', async (req, res) => {
    try {
        const tag = req.params.tag;
        const posts = await PostModel.find({ tag: tag });
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.post('/api/posts/create', async (req, res) => {
    try {
        const post = await req.body
        console.log(post)
        const postData = await new PostModel({
            title: post.title,
            author: 'bez',
            description: post.description,
            preview_image: post.preview_image,
            content: post.content,
            tag: post.tag,
        })
        const savePost = postData.save();
        res.status(200).json(savePost)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.put('/api/posts/:id', async (req, res) => {
    try {
        const post = await req.body;
        const id = req.params.id;
        const options = { new: true };
        const updatedPost = await PostModel.findByIdAndUpdate(id, post, options);
        res.send().json(updatedPost);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.delete('/api/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPost = await PostModel.findByIdAndDelete(id)
        res.send(`Document with ${deletedPost.title} has been deleted..`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
