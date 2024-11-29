const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments")

router.get("/:postId", CommentsController.getAllComments);
router.post("/createcomment", CommentsController.create);

module.exports = router;
