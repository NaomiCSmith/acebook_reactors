const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const mongoose = require('mongoose');


async function getAllPosts(req, res) {
  const posts = await Post.find().sort({createdAt: -1});
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
}

async function createPost(req, res) {
  const post = new Post(req.body);
  await post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}

// const Post = require("../models/post");

async function likePost(req, res) {
  
  try {
    const postId = req.params.id;
    const userId = req.user_id;
  
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likedBy.includes(userId)) {
      return res.status(400).json({ message: "User has already liked this post." });
    }

    post.likedBy.push(userId);
    post.likes += 1;
    await post.save();
    res.status(200).json({ message: "Post liked", likes:post.likes });
  } 
  catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function unLikePost(req, res) {
  
  try {
    const postId = req.params.id;
    const userId = req.body.userId;
    const ObjectId = new mongoose.Types.ObjectId(userId);
    
    const post = await Post.updateOne(
      { _id: postId },
      { $pull: { likedBy: ObjectId } }
    );

    if (post.modifiedCount === 0) {
      return res.status(404).json({ message: "Post not found or user has not liked this post" });
  }
    const updatedPost = await Post.findById(postId); 
    updatedPost.likes -= 1; 
    await updatedPost.save(); 
    res.status(200).json({ message: "Post Un-liked", likes:updatedPost.likes });
  } 
  catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}


const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  likePost: likePost,
  unLikePost: unLikePost,
};

module.exports = PostsController;
