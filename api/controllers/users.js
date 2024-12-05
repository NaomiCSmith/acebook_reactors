const User = require("../models/user");
const multer = require("multer");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const upload = require('../middleware/multer');

/**
* Create a new user.
*/

async function create(req, res) {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    let photoUrl = null;

    if (req.file) {
      
      photoUrl = await new Promise((resolve, reject) => {
        const cloudinaryResult = cloudinary.uploader.upload_stream(
          { folder: 'user_photos' }, 
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error); 
            } else {
              resolve(result.secure_url);  
            }
          }
        );

        cloudinaryResult.end(req.file.buffer);
      });
    }
    const user = new User({
      email,
      password,
      username,
      photo: photoUrl, 
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: savedUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Something went wrong while creating user',
      error: error.message,
    });
  }
}





/**
* Find a user by email.
*/
function findByEmail(req, res) {
  const { email } = req.params;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error("Error finding user by email:", err);
      res.status(500).json({ message: "Something went wrong" });
    });
}
/**
* Find a user by username.
*/
function findByUsername(req, res) {
  const { username } = req.params;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error("Error finding user by username:", err);
      res.status(500).json({ message: "Something went wrong" });
    });
}
/**
* Find a user by ID.
*/
async function findById(req, res) {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID format" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error finding user by ID:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

async function update(req, res) {
  const userId = req.params.id;

  console.log("Updating user with ID:", userId); // Debug log

  // Validate userId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error("Invalid User ID:", userId); // Debug log
    return res.status(400).json({ message: "Invalid User ID format" });
  }

  const { username, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true }
    );
    if (!user) {
      console.error("User Not Found for ID:", userId); // Debug log
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
}

const uploadProfilePhoto = async (req, res) => {
  const { userId } = req.body;

  
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',  
        folder: 'profile_photos', 
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to upload photo to Cloudinary' });
        }
        

        const user = await User.findByIdAndUpdate(
          userId,
          { photo: result.secure_url },  
          { new: true }
        );

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Profile photo updated successfully!", user });
      }
    );

    stream.end(req.file.buffer); 
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    res.status(500).json({ error: "Failed to update photo." });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId)
    .populate('friends')
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addFriend = async (req, res) => {
  const userId = req.params.userId;
  const currentUserId = req.body.userId;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(currentUserId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const currentUser = await User.findById(currentUserId);
    const userToAdd = await User.findById(userId);

    if (!currentUser || !userToAdd) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.friends.includes(userId)) {
      return res.status(400).json({ message: "User is already a friend" });
    }

    currentUser.friends.push(userId);
    userToAdd.friends.push(currentUserId);

    await currentUser.save();
    await userToAdd.save();

    res.status(200).json({ message: "Friend added successfully", user: userToAdd });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const UsersController = {
  create,
  findByEmail,
  findByUsername,
  findById,
  update,
  uploadProfilePhoto,
  getUserProfile,
  addFriend,
};
module.exports = UsersController;
