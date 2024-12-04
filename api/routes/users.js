const express = require("express");
const UsersController = require("../controllers/users");
const router = express.Router();
const multer = require("multer");
const upload = multer();


router.post("/", upload.single('photo'),UsersController.create);
router.get("/find/:email", UsersController.findByEmail);
router.get("/findById/:id", UsersController.findById);
router.get("/findByUsername/:username", UsersController.findByUsername);
router.put("/:id", UsersController.update);
router.post("/profilePhoto",upload.single('file'), UsersController.uploadProfilePhoto);
router.get("/:userId", UsersController.getUserProfile);
router.post("/addFriend/:userId", UsersController.addFriend);



module.exports = router;