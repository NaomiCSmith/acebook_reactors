const Comment = require("../models/comment")
const { generateToken } = require("../lib/token");
const mongoose = require('mongoose');

function create(req, res) {
const postId = req.body.postId;
const userId =  req.body.userId;
const message = req.body.message;

const comment = new Comment({ postId, userId, message });
comment
    .save()
    .then((comment) => {
        // console.log("Comment created, id:", comment._id.toString());
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
    const token = generateToken(userId);
    res.status(200).json({ comments: comments, token: token });
    } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
}
}


const CommentsController = {
    create: create,
    getAllComments: getAllComments,
};

module.exports = CommentsController
