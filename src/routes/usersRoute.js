const express = require("express");
const {
  login,
  createCP,
  updateUser,
  deleteUser,
  allUsers,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const usersRoute = express.Router(); //instance of express router

//create Cadre Pédagogique
usersRoute.post("/createCP", createCP);
//login
usersRoute.post("/login", login);
//update user
usersRoute.put("/update", authMiddleware, updateUser);
//Delete user
usersRoute.delete("/:id", authMiddleware, deleteUser);
//fetch Users
usersRoute.get("/", authMiddleware, allUsers);

module.exports = usersRoute;
