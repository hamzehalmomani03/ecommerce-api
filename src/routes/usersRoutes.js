const express = require("express");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/usersController");

const router = express.Router();


// GET ALL USERS
router.get("/", getUsers);


// CREATE USER
router.post("/", createUser);


// GET USER BY ID
router.get("/:id", getUserById);


// UPDATE USER
router.put("/:id", updateUser);


// DELETE USER
router.delete("/:id", deleteUser);


module.exports = router;