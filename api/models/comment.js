const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
postId: { type: String, required: true }, 
userId: { type: String, required: true },
message: { type: String, required: true },
}, {timestamps: true});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;