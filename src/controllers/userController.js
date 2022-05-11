const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.login = async function (req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.isPasswordMatch(password))) {
    res.status(200);

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).send({
      message: "Invalid credentials",
    });
  }
};

exports.createCP = async function (req, res, next) {
  const { firstName, lastName, email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: "Missing fields",
    });
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(400).send({
      message: "User Exist",
    });
  }
  const userCreated = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: "cadre_pedagogique",
  });

  if (userCreated) {
    return res.status(200).json({
      user: userCreated,
      token: generateToken(userCreated._id),
    });
  } else {
    return res.status(400).send({
      message: "womething wrong",
    });
  }
};

exports.updateUser = async function (req, res, next) {
  const user = await User.findById(req.user._id);

  if (user) {
    user.lastName = req.body.lastName || user.lastName;
    user.firstName = req.body.firstName || user.firstName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();

    res.json({
      user: updatedUser,
    });
  } else {
    res.status(400).send({
      message: "user not found",
    });
  }
};

exports.deleteUser = async function (req, res, next) {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};


exports.allUsers = (req, res) => {
    const role = req.query.role;
    var condition = role ? { role: { $regex: new RegExp(role) } } : {};
  
    User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  };