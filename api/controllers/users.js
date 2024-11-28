const User = require("../models/user");

function create(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ email, password });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
}

function findByEmail(req, res) {
  const {email} = req.params

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    });
}

const UsersController = {
  create: create,
  findByEmail: findByEmail,
};

module.exports = UsersController;
