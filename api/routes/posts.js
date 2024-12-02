const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/createpost", PostsController.createPost);
router.put("/like/:id", PostsController.likePost);
router.put("/unlike/:id", PostsController.unLikePost);
router.delete("/:id", PostsController.deletePost);
router.put("/:postId", PostsController.updateAPost);

module.exports = router;
