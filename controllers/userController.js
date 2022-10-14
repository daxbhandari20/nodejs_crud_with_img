const User = require("../models/userModel");

exports.getUser = async (req, res) => {
  try {
    const user = await User.find();
    console.log(user.length);
    if (user.length > 0) {
      res.status(200).send({ message: "User found.", data: user });
    } else {
      res.status(400).send({ message: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.addUser = (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      file: req.file.filename,
    });

    user.save((err, data) => {
      if (err) {
        res.status(500).send({ message: "Error saving user", error: err });
      } else {
        res.status(200).send({ message: "User Created", data: data });
      }
    });
  } catch (errors) {
    console.log(errors);
    res.status(500).send("Server Error");
  }
};

exports.getUserById = (req, res) => {
  try {
    User.findById(req.params.id, (err, data) => {
      if (data != null) {
        res.status(200).send({ message: "User found.", data: data });
      } else {
        res.status(500).send({ message: "User not found." });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error saving user", error: error });
  }
};

exports.updateUser = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (data != null) {
      const user = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        file: req.file.filename,
      };
      User.findByIdAndUpdate(req.params.id, user, (err, data) => {
        if (err) {
          console.log("err ============", err);
          res.status(500).send({ message: "Error updating user", error: err });
        } else {
          res.status(200).send({ message: "User Update." });
        }
      });
    } else {
      res.status(400).send({ message: "User not found." });
    }
  });
};

exports.deleteUser = (req, res) => {
  try {
    User.findById(req.params.id, (err, data) => {
      if (data != null) {
        User.findByIdAndDelete(req.params.id, (err, user) => {
          res.status(200).send({ message: "User Delete Successfully" });
        });
      } else {
        res.status(400).send({ message: "User not found." });
      }
    });
  } catch (errors) {
    console.log(errors);
    res.status(500).send({ message: "Error deleting user", error: errors });
  }
};
