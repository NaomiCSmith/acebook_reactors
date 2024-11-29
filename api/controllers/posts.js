const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const mongoose = require('mongoose');
const Comment = require("../models/comment");



async function getAllPosts(req, res) {
  const posts = await Post.find().sort({createdAt: -1});
  const token = generateToken(req.user_id);
  const postsWithCommentCount = await Promise.all(
    posts.map(async (post) => {
        const commentCount = await Comment.countDocuments({ postId: post._id });
        return {
            ...post._doc,  // Include all other post data
            commentCount: commentCount  // Add the comment count
        };
    })
  );
  res.status(200).json({ posts: postsWithCommentCount, token: token });
}

async function createPost(req, res) {
  const post = new Post(req.body);
  await post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}

async function likePost(req, res) {
  try {
    const postId = req.params.id;
    const userID = req.headers['userid'];
  
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likedBy.includes(userID)) {
      return res.status(400).json({ message: "User has already liked this post." });
    }

    post.likedBy.push(userID);
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
    const userID = req.headers['userid'];
    const ObjectId = new mongoose.Types.ObjectId(userID);
    
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
