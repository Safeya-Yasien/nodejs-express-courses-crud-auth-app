const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  register,
  login,
} = require("../controllers/users.controller");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/uploadImage");

// Get all users
router.get("/", verifyToken, getAllUsers);

// Register new user
router.post("/register", upload.single("image"), register);

// Login user
router.post("/login", login);

module.exports = router;
