const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");

const upload  = require("../middleware/multer");

router.get("/", PostsController.getAllPosts);
router.post("/createpost",upload.single('image'), PostsController.createPost);
router.put("/like/:id", PostsController.likePost);
router.put("/unlike/:id", PostsController.unLikePost);
router.delete("/:id", PostsController.deletePost);
router.put("/:postId", PostsController.updateAPost);

module.exports = router;
