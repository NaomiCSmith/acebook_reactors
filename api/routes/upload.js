const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/user');

const router = express.Router();

// Configure Multer to save files locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});
const upload = multer({ storage });

// Route to handle file upload and update profile photo
router.post('/profilePhoto', upload.single('file'), async (req, res) => {
  try {
    const filePath = `/uploads/${req.file.filename}`; // Save relative path
    const { userId } = req.body;

    // Update user's profile photo in the database
    const user = await User.findByIdAndUpdate(
      userId,
      { photo: filePath },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ filePath, user });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;
