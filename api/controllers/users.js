const User = require("../models/user");
const multer = require("multer");
const mongoose = require("mongoose");
// Configure Multer for saving files locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file names
  },
});
const upload = multer({ storage }); // Multer middleware
/**
* Create a new user.
*/
async function create(req, res) {
  upload.single("photo")(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ message: "File upload failed" });
    }
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      const user = new User({ email, password, username, photo: photoPath });
      const savedUser = await user.save();
      res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ message: "Something went wrong", error: error.message });
    }
  });
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
/**
* Update user information.
*/
// async function update(req, res) {
//   const userId = req.params.id;
//   const { username, email, password } = req.body;
//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ message: "Invalid User ID format" });
//   }
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { username, email, password },
//       { new: true }
//     );
//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({ message: "User updated successfully", user: updatedUser });
//   } catch (err) {
//     console.error("Error updating user:", err);
//     res.status(500).json({ message: "Failed to update user" });
//   }
// }

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


/**
* Upload or update profile photo.
*/
function uploadProfilePhoto(req, res) {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ message: "Failed to upload image" });
    }
    const { userId, username, email, password } = req.body;
    const filePath = `/uploads/${req.file.filename}`;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email, password, photo: filePath },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
}

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
