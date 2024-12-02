const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments")

router.get("/:postId", CommentsController.getAllComments);
router.post("/createcomment", CommentsController.create);
router.delete("/:commentId", CommentsController.deleteAComment);
router.put("/:commentId", CommentsController.updateAComment);


module.exports = router;
