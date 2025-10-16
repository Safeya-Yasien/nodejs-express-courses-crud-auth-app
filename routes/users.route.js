const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  register,
  login,
  deleteAllUsers,
} = require("../controllers/users.controller");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/uploadImage");
const authorizeRoles = require("../middlewares/authorizeRoles");

// Get all users
router.get("/", verifyToken, getAllUsers);

// Register new user
router.post("/register", upload.single("image"), register);

// Login user
router.post("/login", login);

// delete all users
router.delete("/", verifyToken, authorizeRoles(["admin"]), deleteAllUsers);

module.exports = router;
