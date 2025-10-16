const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  register,
  login,
} = require("../controllers/users.controller");
const verifyToken = require("../middlewares/verifyToken");

// Get all users
router.get("/", verifyToken, getAllUsers);
  
// Register new user
router.post("/register", register);

// Login user
router.post("/login", login);

module.exports = router;
