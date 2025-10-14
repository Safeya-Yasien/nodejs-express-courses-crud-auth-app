const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { __v: 0, password: 0 });
    res.status(200).json({ status: "success", data: { users } });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch users",
      error: err.message,
    });
  }
};

const register = async (req, res) => {
  try {
    // check if user with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ status: "success", data: newUser });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to register user",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // check if user with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Invalid password",
      });
    }

    // if password is valid, return jwt token
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY
    );

    res.status(201).json({
      status: "success",
      message: "Login successful",
      data: { token },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to login user",
      error: err.message,
    });
  }
};

// logout

module.exports = { getAllUsers, register, login };
