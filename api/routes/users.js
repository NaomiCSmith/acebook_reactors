const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/find/:email", UsersController.findByEmail);
router.get("/find/:username", UsersController.findByUsername);

module.exports = router;
