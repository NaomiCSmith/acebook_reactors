const Comment = require("../models/comment")
const { generateToken } = require("../lib/token");
const mongoose = require('mongoose');
const User = require("../models/user")

async function create(req, res) {
    const postId = req.body.postId;
    const userId =  req.body.userId;
    const message = req.body.message;
    const emptyAuthor = {username: ""}
    // console.log(req.body)

    const comment = new Comment({ postId, userId, message, emptyAuthor });
    comment
        .save()
        .then((comment) => {
            res.status(201).json({ message: "OK" });
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json({ message: "Something went wrong" });
        });
    }

async function getAllComments(req, res) {
    try{
    const postId = req.params.postId
    const userId =  req.query.user_id;
    const comments = await Comment.find({postId: postId.toString()});
    
    // find all authors who have posted a comment
    const authorIDs = comments.map(item => item.userId);
    const authors = await Promise.all(authorIDs.map(item => User.findById(item)));

    // correct order of authors to the order of comments:
    // const orderedAuthorIDs = comments.map(comment => comment.userId);
    // const orderedAuthors = orderedAuthorIDs.map(userId => authors.find(user => user._id.toString() === userId))
    // console.log(orderedAuthors)

    // add corresponding user obj using author id
    const commentsWithAuthorObj = comments.map(comment => ({
        ...comment.toObject(),
        author: authors.find(author => author._id.toString() === comment.userId)
      }));
    const token = generateToken(userId);
    res.status(200).json({ comments: commentsWithAuthorObj, token: token });
} catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
};
};

const deleteAComment = async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        await Comment.findByIdAndDelete(commentId);
        return res.status(200).json({ message: "Comment deleted successfully." });
        } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const updateAComment = async (req, res) => {
    try {
    const commentId = req.params.commentId;
    const { message } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }
    comment.message = message;
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ message: "Server error" });
    }
    };


const CommentsController = {
    create: create,
    getAllComments: getAllComments,
    deleteAComment: deleteAComment,
    updateAComment: updateAComment,
};

module.exports = CommentsController
